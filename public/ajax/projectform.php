<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit;
}

// ---- HONEYPOT (hidden input name="company") ----
if (!empty($_POST['company'] ?? '')) {
    echo json_encode(['success' => false, 'message' => 'Bad request']);
    exit;
}

function get_body($firstName, $lastname, $email, $mobile, $project)
{
    $fullName = htmlspecialchars($firstName) . ' ' . htmlspecialchars($lastname);
    ob_start();
?>
    <html>

    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', sans-serif; color: #333; padding:30px 0;">
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="margin: 40px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
                <td style="background-color: #002447; color: #ffffff; padding: 20px 30px; text-align: center;">
                    <h2 style="margin: 0;">New Enquiry</h2>
                    <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.8; letter-spacing: 1px; text-transform: uppercase;"><?= htmlspecialchars($project) ?></p>
                </td>
            </tr>
            <!-- Body Content -->
            <tr>
                <td style="padding: 30px;">
                    <table cellpadding="10" cellspacing="0" width="100%" style="margin-top: 20px; background-color: #f9f9f9; border-radius: 8px;">
                        <tr>
                            <td width="30%" style="font-weight: bold;"> Name:</td>
                            <td><?= $fullName ?></td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;"> Mobile:</td>
                            <td><?= htmlspecialchars($mobile) ?></td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;"> Email:</td>
                            <td><a href="mailto:<?= htmlspecialchars($email) ?>" style="color: #002447;"><?= htmlspecialchars($email) ?></a></td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;"> Project:</td>
                            <td><?= htmlspecialchars($project) ?></td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;"> Authorized:</td>
                            <td style="color: #2a7a2a;">
                                <span style="display: inline-flex; align-items: center; gap: 6px;">
                                    I authorize S A Homes to contact me.
                                </span>
                            </td>
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

    </html>
<?php
    return ob_get_clean();
}

$response = array();
$errors   = array();

if (!isset($_POST['firstName']) || empty(trim($_POST['firstName']))) {
    array_push($errors, 'Please enter your first name');
}
if (!isset($_POST['lastname']) || empty(trim($_POST['lastname']))) {
    array_push($errors, 'Please enter your last name');
}
if (!isset($_POST['email']) || empty(trim($_POST['email']))) {
    array_push($errors, 'Please enter your email');
}
if (!isset($_POST['mobile']) || empty(trim($_POST['mobile']))) {
    array_push($errors, 'Please enter your mobile number');
}
if (!isset($_POST['project']) || empty(trim($_POST['project']))) {
    array_push($errors, 'Project name is missing');
}
if (empty($_POST['authorize']) || $_POST['authorize'] !== 'true') {
    array_push($errors, 'You must authorize to proceed');
}

if (!empty($errors)) {
    $response = array('success' => false, 'message' => implode("\n", $errors));
} else {
    $firstName = trim($_POST['firstName']);
    $lastname  = trim($_POST['lastname']);
    $email     = trim($_POST['email']);
    $mobile    = trim($_POST['mobile']);
    $project   = trim($_POST['project']);

    require_once(dirname(__DIR__) . '/vendor/autoload.php');

    $config = Brevo\Client\Configuration::getDefaultConfiguration()->setApiKey('api-key', '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');

    $apiInstance = new Brevo\Client\Api\TransactionalEmailsApi(
        new GuzzleHttp\Client(),
        $config
    );

    $sendSmtpEmail = new \Brevo\Client\Model\SendSmtpEmail([
        'subject' => 'New Enquiry — ' . $project,
        'sender' => [
            'name'  => 'S A Homes Website',
            'email' => 'website@sahomesinfra.com'
        ],
        'replyTo' => [
            'name'  => $firstName . ' ' . $lastname,
            'email' => $email
        ],
        'to' => [
            [
                'name'  => 'S A Homes',
                'email' => 'contact@sahomesinfra.com'
            ],
            [
                'name'  => 'S A Homes',
                'email' => 'mvijay.mediamax@gmail.com'
            ]
        ],
        'htmlContent' => get_body($firstName, $lastname, $email, $mobile, $project),
    ]);

    try {
        $result   = $apiInstance->sendTransacEmail($sendSmtpEmail);
        $response = array('success' => true, 'message' => 'Thanks, we will get back to you.');
    } catch (Exception $e) {
        $response = array('success' => false, 'message' => 'Failed. Please try again later.');
    }
}

echo json_encode($response);
