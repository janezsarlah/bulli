(function($){

	

	// Put event listeners into place
	window.addEventListener("DOMContentLoaded", function() {
		// Grab elements, create settings, etc.
		initCamera();
		
	}, false);

	
	// Get video size
	var getVideoSize = function() { 
		videoWidth = video.videoWidth; 
		videoHeight = video.videoHeight; 
		video.removeEventListener('playing', getVideoSize, false); 
	}; 

	video.addEventListener('playing', function() {
		getVideoSize();
    	init();
	}, false);


})(jQuery);

/* INIT CAMERA */
// Put video listeners into place
function initCamera() {


	if (isApple()) {
		switcheToUpload();
		return;
	}

	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        switcheToUpload();
		return;
    }



	//switcheToUpload();
	//return;

	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, 
			function(stream) {
				video.src = stream;
				video.onloadedmetadata = function(e) {
				video.play();
			};
		}, 	function(err) {
	        	console.log("The following error occured: " + err.name);
	        	switcheToUpload();
	return;

	      	}
	    );
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.onloadedmetadata = function(e) {
			  video.play();
			};
		}, function(err) {
	         console.log("The following error occured: " + err.name);
	         switcheToUpload();
	return;

	      });
	}
	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.onloadedmetadata = function(e) {
			  video.play();
			};
		},function(err) {
	         console.log("The following error occured: " + err.name);
	         switcheToUpload();
			return;

	      } );
	}
}
/* INIT CAMERA */

// Device dos't support camera
function switcheToUpload() {
	$('#slide2').addClass('upload');
	
	$camera.hide();
	$upload.show();
	//$('#slide2').addClass('withBackground');
}

/* TAKE PICTURE AND HANDLE */
// Save image from div to canvas
function convertDivToCanvas() {
	html2canvas($(".camera__container"), {
        onrendered: function(canvas) {
            theCanvas = canvas;
            document.body.appendChild(canvas);
            $capturedImage.find(".camera__container").append(canvas);
        }
    });
}

// Combine canvas
function combineCanvas() {
	var canvas1 = document.getElementById('canvas');
	var canvas2 = document.getElementById('canvas2');
	var canvas3 = document.getElementById('canvas3');
	canvas3.width = videoWidth;
	canvas3.height = videoHeight;

	var ctx = canvas3.getContext('2d');
	ctx.drawImage(canvas1, 0, 0);
	ctx.drawImage(canvas2, 0, 0);
}

// Conver image to canvas
function imageToCanvas() {
	var image = new Image(),
		$image = $fridge,
		bulliW = ($image.width() / dw) * videoWidth,
		bulliH = ($image.height() / $image.width()) * bulliW,
		canvas2, xco, yco;

	//console.log("D: " + dw + ", F: " + $image.width());

	image.src = $image.attr('src');
	image.width = "100";
	canvas2 = document.getElementById('canvas2');
	canvas2.width = videoWidth;
	canvas2.height = videoHeight;
	xco = canvas2.width / 2 - bulliW / 2;
	yco = canvas2.height / 2 - bulliH / 2.55;
	canvas2.getContext('2d').drawImage(image, xco, yco, bulliW, bulliH);
} 

// Remove previous taken image
function removePreviousImage() {
    $capturedImage.empty();
    $capturedImage.removeAttr('style');
    $fridge.removeClass('hide');
}

// Copy image from canvas to img tag
function converCanvasToBackground() {
	var can = document.getElementById('canvas3');
	var img = new Image();
	img.src = can.toDataURL();
	$capturedImage.css("background-image", "url('" + can.toDataURL("image/png") + "')");
	$capturedImage.data("imageurl", can.toDataURL("image/png"));
	//$capturedImage.append(img);
}
/* TAKE PICTURE AND HANDLE */
