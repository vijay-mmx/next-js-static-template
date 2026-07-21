<?php
header('Content-Type: application/json; charset=utf-8');

require_once(dirname(__DIR__) . '/vendor/autoload.php');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Start session for rate-limiting
if (session_status() === PHP_SESSION_NONE) session_start();

// ---- RATE LIMIT (1 submit per 5 sec per session) ----
$now = time();
if (isset($_SESSION['last_career_submit']) && ($now - $_SESSION['last_career_submit']) < 5) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many requests']);
    exit;
}
$_SESSION['last_career_submit'] = $now;

// ---- HONEYPOT (hidden input name="company") ----
if (!empty($_POST['company'] ?? '')) {
    echo json_encode(['success' => false, 'message' => 'Bad request']);
    exit;
}

// ---- UTILITIES ----
function clean($value, $max = 200) {
    $v = trim((string)$value);
    $v = strip_tags($v);
    $v = str_replace(["\r", "\n"], " ", $v);
    return mb_substr($v, 0, $max);
}
function h($s) {
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// ---- INPUT CLEAN / VALIDATE ----
$name        = clean($_POST['name'] ?? '', 100);
$email_raw   = $_POST['email'] ?? '';
$email       = filter_var($email_raw, FILTER_VALIDATE_EMAIL);
$mobile      = clean($_POST['mobile'] ?? '', 30);
$jobtitle    = clean($_POST['jobtitle'] ?? '', 100);
$portfolio   = clean($_POST['portfolio'] ?? '', 500);
$coverletter = trim($_POST['coverletter'] ?? '');

// Basic validation
$errors = [];
if (!$name || mb_strlen($name) < 5) $errors[] = 'Name is required (min 5 chars)';
if (!$email)                         $errors[] = 'Please enter a valid email';
if (!$mobile || mb_strlen($mobile) < 6 || !preg_match('/^[0-9+\-\s()]*$/', $mobile))
                                     $errors[] = 'Enter a valid contact number';
if (!$jobtitle)                      $errors[] = 'Job title is required';
if (!$coverletter || mb_strlen($coverletter) < 20)
                                     $errors[] = 'Cover letter is required (min 20 chars)';

// Resume file must be present
if (!isset($_FILES['resume']) || !is_array($_FILES['resume'])) {
    $errors[] = 'Please upload a resume';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' | ', $errors)]);
    exit;
}

// ---- FILE VALIDATION ----
$file = $_FILES['resume'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'File upload error']);
    exit;
}

$maxBytes = 5 * 1024 * 1024; // 5 MB
if ($file['size'] > $maxBytes) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Resume must be 5 MB or less']);
    exit;
}

// Validate MIME type using finfo
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime  = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$allowed = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

if (!in_array($mime, $allowed, true)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Only PDF or Word documents are allowed']);
    exit;
}

// ---- DUPLICATE BLOCK (same email + job within 24 h) ----
$logDir = __DIR__ . '/data/';
if (!is_dir($logDir)) mkdir($logDir, 0755, true);

$key     = md5(strtolower($email) . '|' . strtolower($jobtitle));
$logFile = $logDir . $key . '.txt';

if (file_exists($logFile)) {
    $last = (int)file_get_contents($logFile);
    if (time() - $last < 86400) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'You have already applied for this role.']);
        exit;
    }
}
file_put_contents($logFile, time(), LOCK_EX);

// ---- SAVE RESUME ----
$publicDir = __DIR__ . '/data/resumes/';
if (!is_dir($publicDir)) mkdir($publicDir, 0755, true);

$origName   = basename($file['name']);
$origName   = preg_replace('/[^A-Za-z0-9\-\._ ]/', '_', $origName);
$ext        = pathinfo($origName, PATHINFO_EXTENSION);
$uniqueName = md5(strtolower($email) . '|' . $origName . '|' . microtime(true)) . ($ext ? '.' . $ext : '');
$savePath   = $publicDir . $uniqueName;

if (!move_uploaded_file($file['tmp_name'], $savePath)) {
    @unlink($logFile);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save uploaded file']);
    exit;
}

// Public URL for the saved resume
$proto     = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443 ? 'https' : 'http';
$host      = $_SERVER['HTTP_HOST'];
$resumeUrl = $proto . '://' . $host . '/ajax/data/resumes/' . rawurlencode($uniqueName);

// ---- BUILD HTML EMAIL ----
function get_body($name, $email, $mobile, $jobtitle, $portfolio, $coverletter, $resumeUrl) {
    $portfolioRow = '';
    if (!empty($portfolio)) {
        $portfolioRow = '
        <tr>
            <td width="30%" style="font-weight: bold;">Portfolio:</td>
            <td><a href="' . h($portfolio) . '" style="color: #002447;" target="_blank" rel="noreferrer noopener">' . h($portfolio) . '</a></td>
        </tr>';
    }

    return '
    <html>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: \'Segoe UI\', sans-serif; color: #333; padding: 30px 0;">
        <table align="center" width="600" cellpadding="0" cellspacing="0"
               style="margin: 40px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
                <td style="background-color: #002447; color: #ffffff; padding: 20px 30px; text-align: center;">
                    <h2 style="margin: 0;">Career Application Submission</h2>
                </td>
            </tr>

            <!-- Body Content -->
            <tr>
                <td style="padding: 30px;">
                    <table cellpadding="10" cellspacing="0" width="100%"
                           style="margin-top: 20px; background-color: #f9f9f9; border-radius: 8px;">
                        <tr>
                            <td width="30%" style="font-weight: bold;">Name:</td>
                            <td>' . h($name) . '</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Applying For:</td>
                            <td>' . h($jobtitle) . '</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Mobile:</td>
                            <td>' . h($mobile) . '</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Email:</td>
                            <td><a href="mailto:' . h($email) . '" style="color: #002447;">' . h($email) . '</a></td>
                        </tr>
                        ' . $portfolioRow . '
                        <tr>
                            <td style="font-weight: bold; vertical-align: top;">Cover Letter:</td>
                            <td>' . nl2br(h($coverletter)) . '</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Resume:</td>
                            <td><a href="' . h($resumeUrl) . '" style="color: #002447;" target="_blank" rel="noreferrer noopener">Download Resume</a></td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background-color: #f0f0f0; padding: 15px 30px; text-align: center; font-size: 12px; color: #888;">
                    This is an automated message — please do not reply.
                </td>
            </tr>

        </table>
    </body>
    </html>';
}

// ---- SEND VIA BREVO ----
$config = Brevo\Client\Configuration::getDefaultConfiguration()->setApiKey('api-key', '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');

$apiInstance = new Brevo\Client\Api\TransactionalEmailsApi(
    new GuzzleHttp\Client(),
    $config
);

$sendSmtpEmail = new \Brevo\Client\Model\SendSmtpEmail([
    'subject' => 'Career Application - ' . ($jobtitle ?: 'Applicant'),
    'sender' => [
        'name' => 'S A Homes',
        'email' => 'website@sahomesinfra.com'
    ],
    'replyTo' => [
        'name' => $name,
        'email' => $email
    ],
    'to' => [
        [
            'name' => 'S A Homes',
            'email' => 'contact@sahomesinfra.com'
        ]
    ],
    'htmlContent' => get_body($name, $email, $mobile, $jobtitle, $portfolio, $coverletter, $resumeUrl),
]);

try {
    $apiInstance->sendTransacEmail($sendSmtpEmail);
    echo json_encode(['success' => true, 'message' => 'Application received. Thank you!']);
} catch (\Brevo\Client\ApiException $e) {
    // Keep the saved resume; log the error server-side if needed
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail sending failed. Please try again later.']);
}