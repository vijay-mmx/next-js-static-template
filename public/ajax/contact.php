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

function get_body($name, $email, $mobile, $service, $message)
{
    ob_start();
?>
    <html>

    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', sans-serif; color: #333; padding:30px 0;">
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="margin: 40px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
                <td style="background-color: #002447; color: #ffffff; padding: 20px 30px; text-align: center;">
                    <h2 style="margin: 0;">Contact Form Submission</h2>
                </td>
            </tr>
            <!-- Body Content -->
            <tr>
                <td style="padding: 30px;">
                    <table cellpadding="10" cellspacing="0" width="100%" style="margin-top: 20px; background-color: #f9f9f9; border-radius: 8px;">
                        <tr>
                            <td width="30%" style="font-weight: bold;"> Name:</td>
                            <td><?= $name ?></td>
                        </tr>
                        <tr>
                            <td width="30%" style="font-weight: bold;"> Service:</td>
                            <td><?= $service ?></td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;"> Mobile:</td>
                            <td><?= $mobile ?></td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;"> Email:</td>
                            <td><a href="mailto:<?= $email ?>" style="color: #002447;"><?= $email ?></a></td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;"> Message:</td>
                            <td><?= $message ?></td>
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
$errors = array();

if (!isset($_POST['name']) || empty($_POST['name'])) {
    array_push($errors, 'Please enter your name');
}

if (!isset($_POST['service']) || empty($_POST['service'])) {
    array_push($errors, 'Please select a service');
}
if (!isset($_POST['email']) || empty($_POST['email'])) {
    array_push($errors, 'Please enter your email');
}
if (!isset($_POST['mobile']) || empty($_POST['mobile'])) {
    array_push($errors, 'Please enter your mobile');
}
if (!isset($_POST['message']) || empty($_POST['message'])) {
    array_push($errors, 'Please enter a message');
}

if (!empty($errors)) {
    $response = array('success' => false, 'message' => implode("\n", $errors));
} else {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $message = $_POST['message'];
    $service = $_POST['service'];

    require_once(dirname(__DIR__) . '/vendor/autoload.php');

    $config = Brevo\Client\Configuration::getDefaultConfiguration()->setApiKey('api-key', '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');

    $apiInstance = new Brevo\Client\Api\TransactionalEmailsApi(
        new GuzzleHttp\Client(),
        $config
    );
    $sendSmtpEmail = new \Brevo\Client\Model\SendSmtpEmail([
        'subject' => 'Contact Form Submission',
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
        'htmlContent' => get_body($name, $email, $mobile, $service, $message),
    ]);

    try {
        $result = $apiInstance->sendTransacEmail($sendSmtpEmail);
        $response = array('success' => true, 'message' => "Thanks, we will get back to you.");
    } catch (Exception $e) {
        $response = array('success' => false, 'message' => "Failed!. Please try again later");
    }
}

echo json_encode($response);
