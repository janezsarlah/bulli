(function($) {

    initslide(function() {
        $('.container').height(window.innerHeight);

        $('.intro__text').on('click', function() {
            $.fn.fullpage.moveSlideRight();
        });

        // Test data
        /*$('.form .title').on('click', function() {
            $('input[name=name]').val("Janez");
            $('input[name=surname]').val("Šarlah");
            $('input[name=email]').val("janez.sarlah@nekaj.si");
        });*/

        $('.submit').on('click', function() {
            if ($(this).hasClass('disabled'))
                return;

            var form = $('form'),
                errorT = $('.errors'),
                error = [];

            if (!validEmail(form.find('input[name=email]').val()))
                error = "Email ni v pravilni obliki!";

            if (!fieldValidate(form))
                error = "Izpolniti morate vsa polja!";

            if (error.length === 0) {
                errorT.empty();
                $('.loader-container').addClass('active');
                
                var user = getFormData(form);
   
                addUser(user);

            } else {
                errorT.text(error);
            }
        });

        $('.thankyou .fa-backward').on('click', function() {
            location.reload();
        });
    });


    function initslide(callback) {
        $('#fullpage').fullpage({
            registerEvents: false,
            registerEvents: false,
            controlArrows: false,
        });
        $.fn.fullpage.setAllowScrolling(false);
        callback();    
    }   

    function getFormData(form) {
        var data = {};

        form.find('input').each(function(i) {
            data[$(this).attr('name')] = $(this).val();
        });

        return data;
    }

    function addUser(user) {
        var $thanks = $('.thankyou');
        toggleButton(true);
        $.ajax({
            type: "POST",
            url: "add.php",
            data: user,

            success: function(response){
                $thanks.addClass("success").find(".icon .fa").addClass("fa-check");
                $thanks.find('.title').text(response);
                $.fn.fullpage.moveSlideRight();
                toggleButton(false);
            },
            error: function(response){
                $thanks.removeClass("success").find(".icon .fa").addClass("fa-exclamation");
                $thanks.find('.title').text(response);
                $.fn.fullpage.moveSlideRight();
            }
        });
    }

    // Remove previous taken image
    function removePreviousImage() {
        $('.captured-image').empty();
        $('.captured-image').removeAttr('style');
        $('.captured-image').find('.bulli_fridge').removeClass('hide');
    }

})(jQuery)