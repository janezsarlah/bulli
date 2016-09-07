var $camera = $('.camera'),
	$upload = $('.upload'),
	$capturedImage = $camera.find('.captured-image'),
	$upImage = $upload.find('#pf_foto'),
	$drag = $('.drag'),
	$fridge = $('.bulli_fridge'),
	$end = $('.thankyou'),
	reinitTimer,
	videoWidth,
	videoHeight,
	dh = window.innerHeight,
	dw = window.innerWidth;


var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	video = document.getElementById("video"),
	videoObj = { video: { facingMode: { exact: "environment" } } },
	errBack = function(error) {
		console.log("Video capture error: ", error.code); 
	};



/* VALIDATION FUNCTIONS */
// Check if snap already exists
function imageExists(element) {
	return (element.css('background-image') != 'none') ? true : false;
}

// Detect if the device is mobile
function isMobile() {
	var mobile = false; 

	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) mobile = true;

	return mobile;
}

// Check if device iPhone ir iPad
function isApple() {
	return navigator.userAgent.match(/iPad/i) != null;
}
/* VALIDATION FUNCTIONS */


/* INIT FUNCTIONS */
// Set all sizes
function init() {
    bodyHeight();
    resizeVideo();
    resizeCanvas();
    setFridgeWidth();
    setFridgeBottom();
    imageContainerSize();
}

// Set fridge width
function setFridgeBottom() {
    $drag.css({'top': ((dh / 2) - ($('#bul').height() / 2.5)) + 'px', 'left': '50%'});
    $drag.css({'top': ((dh / 2) - ($('#bul1').height() / 2.5)) + 'px', 'left': '50%'});
}

// Set fridge bottom
function setFridgeWidth() {
    $fridge.css('width', (dw < 1100 ? (dw - (dw * 0.4)) : (1100 - (1100 * 0.4))) + 'px');
}

// Set canvas size
function resizeCanvas() {
    $camera.find('#canvas').attr({width:videoWidth, height:videoHeight});
}   

// Set video size
function resizeVideo() {
    $camera.find('#video').attr({width:videoWidth, height:videoHeight});
}

// Set body size
function bodyHeight() {
    document.body.style.height = window.innerHeight + "px";
}

// Set uploaded image width and height
function resizeUploadedImage() {
	window.innerWidth < 768 ? $upload.find('#pf_foto').css({width:dw, height:dh}) : $upload.find('#pf_foto').css({width:$upload.find('.uploadedImageContainer'), height:dh});
}

// Set image container size
function imageContainerSize() {
    $capturedImage.css({'height': dh, 'width': (dw <= 1100) ? dw : 1100});
}
/* INIT FUNCTIONS */

/* FORM VALIDATION */
// Validate if all fields are filled
function fieldValidate(form) {
	var valid = true;
	form.find('input').each(function(i) {
		if ($(this).val().length === 0)
			valid = false;
	});

	return valid;
}

// Check if email is in the correct format
function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

// Toggle send button
function toggleButton(disable) {
	var button = $('.form').find('.submit');
	disable ? button.attr('disable', true).addClass('disabled') : button.removeClass('disabled');
}	
/* FORM VALIDATION */


/* ANIMATION FUNCTIONS */
function animateUploadTake(element) {
	element.addClass('bounce');
	setTimeout(function() {
	    element.removeClass('bounce');
	}, 1000);
}
/* ANIMATION FUNCTIONS */

/* FACEBOOK SHARE */
function share() {
    FB.ui({
        method: 'feed',
        link: 'https://oss-dev.av-studio.si/bulli/',
        caption: 'Parkiraj Bulli hladilnik',
        description: "Ful je fajn tale hladilnik. Parkirajte ga v svoji kuhinji. :)",
        app_id: "1085241391529301",
        picture: "http://oss-dev.av-studio.si/bulli/img/fb_share.png",
        name: "Parkiraj Bulli hladilnik",
    }, function(response){
        //console.log(response);
        if(response){
            //console.log("extended takeover time");
            takeoverTime = 1;
        }
    });
}
/* FACEBOOK SHARE */







