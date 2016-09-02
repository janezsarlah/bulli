(function($) {
	// On resize reinit
	$(window).resize(function () {
	    clearTimeout(reinitTimer);
	    reinitTimer = setTimeout(init, 100);
	});

	// Draw imaga on canvas
	$camera.find('#snap').on('click', function() {
		if (!imageExists($capturedImage)) {
			context.drawImage(video, 0, 0, videoWidth, videoHeight);
			imageToCanvas();	
			combineCanvas();
			converCanvasToBackground();
			$drag.addClass('hide');
		}
	});

	// Reset camera
	$camera.find('#newsnap').on('click', function() {
		removePreviousImage();
		imageContainerSize();
	});

	// Send image
	$camera.find('#send').on('click', function() {
		if (imageExists($capturedImage)) {

			$.fn.fullpage.moveSlideRight(); 

			var imageUrl = $capturedImage.data('imageurl');

			$('#imagelink').val(imageUrl);

		} else {
			animateUploadTake($camera.find('#snap'));
		}
	});	

	// Close or switch to upload
	$camera.find('.close').on('click', function() {
		$camera.find('.message').fadeOut();
	});

	$camera.find('.switch').on('click', function() {
		switcheToUpload();
	});
})(jQuery)
