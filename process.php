<?php
require_once('includes/config.php');
require_once('includes/PHPMailer/class.phpmailer.php');

function sanitize($text) {
    $text = trim($text);
    
    if (get_magic_quotes_gpc()) {
        $text = stripslashes($text);
    }
    return $text;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $entries = array();
    $errors = array();
    
    // Escape and extract all the post values
    foreach ($_POST as $key => $value) {
        $entries[$key] = sanitize($value);
    }
    
    // Get a set of variable variables for easier use
    foreach ($entries as $key => $value) {
        ${$key} = $value;
    }
    
    // Validate each form field
    if (empty($name)) {
        $errors['name'] = 'This field is required.';
    }
    if (empty($email)) {
        $errors['email'] = 'This field is required.';
    }
    elseif (!(filter_var($email, FILTER_VALIDATE_EMAIL))) {
        $errors['email'] = 'Please enter a valid email address.';
    }
    if (empty($message)) {
        $errors['message'] = 'This field is required';
    }
    
    if (empty($errors)) {
        
        $formOK = true;        
        // Passing true causes PHPMailer to throw exceptions
        $mail = new PHPMailer(true);
        
        try {
            $mail->IsSMTP();
            $mail->SMTPDebug = 0;
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = "ssl";
            $mail->Host = MAIL_HOST;
            $mail->Port = MAIL_PORT;
            $mail->Username = MAIL_USER;
            $mail->Password = MAIL_PASS;
            $mail->SetFrom($email, $name);
            $mail->Subject = "Contact Form Submission";
            $mail->Body = "Your received the following message from $name <$email>:\r\n\r\n$message";
            $mail->AddAddress(MAIL_ADDR);
            $mail->Send();
        }
        catch (phpmailerException $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo "Exception occurred: ".$e->errorMessage();
            exit();
        }
    }
    else {
        $formOK = false;
    }
    
    //if this is not an ajax request  
    if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest'){  
        session_start();  
        $return_data = array(
            'formOK'  => $formOK,
            'errors'  => $errors,
            'entries' => $entries
        );
        $_SESSION['return_data']  = $return_data;
        header('Location: ' . BASE_URL);
        exit();
    } 
}
else {
    header('Location: ' . BASE_URL);
    exit();
}