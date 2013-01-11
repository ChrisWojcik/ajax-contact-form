$(function() {
    
    // Form validation via plugin
    var submitMessage     = $('#submit-message'),
        messageContainer  = submitMessage.find('span'),
        loading           = $('#loading');
        
    function showSuccess(message) {
        messageContainer.text(message)
        messageContainer.attr('class', 'success');
    }
    
    function showFailure(message) {
        messageContainer.text(message)
        messageContainer.attr('class', 'failure');
    }
        
    $('#contact-form').validate({        
               
        // Override to submit the form via ajax
        submitHandler: function(form) {
            var options = {
                beforeSubmit: function() {
                    loading.show();
                },
                success: function() {
                    showSuccess('Thank you! Your email has been submitted.');
                    form.reset();
                    loading.hide();
                },
                error: function() {
                    showFailure("We're sorry, your email could not be sent. Please try again later.");
                    loading.hide();
                }
            };
            $(form).ajaxSubmit(options);
        },
        invalidHandler: function() {
            showFailure('There were some problems with your submission.');
        }
    });
});