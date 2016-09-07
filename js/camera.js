
var videoElement = document.querySelector('video');
var videoSelect = document.querySelector('#videoSource');

var selectors = [videoSelect];

var element = document.getElementById("click");

(function($){
	// Put event listeners into place
	window.addEventListener("DOMContentLoaded", function() {

		if (isMobile()) {
			console.log(isMobile());
			element.addEventListener('click', function() { 
			    if (window.stream) {
			      window.stream.getTracks().forEach(function(track) {
			        track.stop();
			      });
			    }

				if (videoSource.options.length > 1) {
				    var constraints = {
					    video: {deviceId: videoSource.options[1].value ? {exact: videoSource.options[1].value} : undefined},
				    };
				} else {
					var constraints = {
					    video: {deviceId: videoSource.value ? {exact: videoSource.value} : undefined},
				    };
				}

		
			    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);

			}, false);

		}

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

	if (isMobile) {
		start();

	} else {

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


	



}
/* INIT CAMERA */

// Device does't support camera
function switcheToUpload() {
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

/* CAMERA RELATED FUNCTIONS */
function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.

  var values = selectors.map(function(select) {
    return select.value;
  });

  // Remove duplicates from dropdown
  selectors.forEach(function(select) {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });



  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement('option');
    
    option.value = deviceInfo.deviceId;

    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } 
  }

  selectors.forEach(function(select, selectorIndex) {
    if (Array.prototype.slice.call(select.childNodes).some(function(n) {
      return n.value === values[selectorIndex];
    })) {
      select.value = values[selectorIndex];
    }
  });

}


function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}


function start() {

  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  var videoSource = videoSelect.value;

  var constraints = {
    video: {deviceId: videoSource ? {exact: videoSource} : undefined},
  };

  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
  switcheToUpload();
  return;
}
/* CAMERA RELATED FUNCTIONS */
