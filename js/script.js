$(function() {
    
    // Form validation via plugin
    var submitMessage     = $('#submit-message'),
        messageContainer  = submitMessage.find('span'),
        loading           = $('#loading');
        
    function showMessage(message, classAttr) {
        messageContainer.text(message)
        messageContainer.attr('class', classAttr);
    }
    
        
    $('#contact-form').validate({        
               
        // Override to submit the form via ajax
        submitHandler: function(form) {
            var options = {
                beforeSubmit: function() {
                    loading.show();
                },
                success: function() {
                    showMessage('Thank you! Your email has been submitted.', 'success');
                    form.reset();
                    loading.hide();
                },
                error: function() {
                    showMessage('We\'re sorry, your email could not be sent. Please try again later.', 'failure');
                    loading.hide();
                }
            };
            $(form).ajaxSubmit(options);
        },
        invalidHandler: function() {
            showMessage('There were some problems with your submission.', 'failure');
        }
    });
});
