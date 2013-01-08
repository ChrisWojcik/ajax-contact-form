$(function() {
    
    // Form validation via plugin
    var submitMessage  = $('#submit-message').find('span'),
        loading        = $('#loading');
        
    function showSuccess(message) {
        submitMessage.text(message)
        submitMessage.addClass('success');
        submitMessage.removeClass('hidden');
    }
    
    function showFailure(message) {
        submitMessage.text(message)
        submitMessage.addClass('failure');
        submitMessage.removeClass('hidden');
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
                statusCode: {
                    500: function() {
                        showFailure("We're sorry, there was a problem sumitting your email.");                        
                        loading.hide();
                    }
                }
            };
            $(form).ajaxSubmit(options);
        },
        invalidHandler: function() {
            showFailure('There were some problems with your submission.');
        }
    });
});