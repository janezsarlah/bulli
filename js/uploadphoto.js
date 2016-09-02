 (function() {

    // Trigger upload file
    $upload.find('#upload').on('click', function() {
        $upload.find('#uploadedFile').trigger('click');
    });

    // File upload
    $upload.find('#uploadedFile').change(function () {

        var file = this.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            resizeUploadedImage();
            $upImage.css('background-image', 'url("' + reader.result + '")');
            addBgImageToDataAttr();
            showFrige(true);
            $upload.find('.uploadmessage').fadeOut();
            setFridgeBottom();

        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
           
        }


    });

    // Add trigger to remove previously added photo
    $upload.find('#newupload').on('click', function() {
        removeUploadedImage();
        showFrige(false);
    });

    // Add trigger to send image
    $upload.find('#sendupload').on('click', function() {
        if (imageExists($upImage)) {
            $('.loader-container1').addClass('active');

            //$.fn.fullpage.destroy('all');
            convertHtmlToCanvas();
            //reinitSlide();
            $.fn.fullpage.moveTo(0, 3);
        } else {
            animateUploadTake($upload.find('#upload'));
        }
    });

    // Make the uploaded image draggable
    $upload.find('#bul').draggable();

    // Remove previously uploaded photo
    function removeUploadedImage() {
        showFrige(false);
        $upImage.removeAttr('style');
        $upload.find('#uploadedFile').val('');
                

    }
    
    // Show/Hide bulli frige
    function showFrige(show) {
        show ? $upload.find('.drag').show() : $upload.find('.drag').hide();
    }

    // Add uploaded image as background
    function addBgImageToDataAttr() {
        var bgImage = $upImage.css('background-image');
        $upImage.data("imageurl", bgImage);
    }

    // Convert html to canvas
    function convertHtmlToCanvas() {
        html2canvas($('.uploadedImageContainer'), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                console.log(theCanvas.toDataURL("image/png", 0.1));
                $('#imagelink').val(canvas.toDataURL("image/png", 1.0));

                $("#image-out").append(canvas);
            }
        });
    }

    // Reinit slide
    function reinitSlide() {
        $('#fullpage').fullpage({
            registerEvents: false,
            registerEvents: false,
            controlArrows: false,
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
                //console.log("Index: " + slideIndex);
            }
        });
        $.fn.fullpage.setAllowScrolling(false);
    }

 })(jQuery)
 
