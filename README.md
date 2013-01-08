# ajax-contact-form

A basic contact form built using phpmailer and the jQuery validate and form plugins.

## Features
This project has the following functionality:

* Validated on both the client and server sides.
* Submitted via ajax, displays status messages without page reload.
* Still works with javascript disabled.
* Email is submitted using SMTP over SSL
* Easy configuration file (default set-up is for a gmail account).
* I've added some basic exception handling, but it could probably be better.

## How To Use
1. Open `includes/config.php` and set your configuration options. I **STRONGLY** recommend 
that you move the includes folder to a more secure location for production use. You will need to 
update the file paths in `process.php` accordingly. 
2. The default options assume a gmail account, check with your hosting provider if 
you need the details for a different email server.
3. You may receive an email from gmail asking you to confirm that the access was 
legitimate the first time the script is run.
4. Gmail will re-write the `From:` HTTP header to your own email address. This cannot be overriden. 
To get around this you will need to send from a different email address.

## References
* https://code.google.com/a/apache-extras.org/p/phpmailer/
* https://github.com/jzaefferer/jquery-validation
* https://github.com/malsup/form