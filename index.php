<?php 

include 'partials/header.php'; 

if ( isset($_GET['lang']) && file_exists('languages/'.$_GET['lang'].'.php') ){
  include_once('languages/'.$_GET['lang'].'.php');
} else {
  include_once('languages/sl.php');
}



?>

<div id="page-loader">
<div class="loader-inner">
	<div class="loader">Loading...</div>
</div>
</div>

<script type="text/javascript">
	var loader = document.getElementById("page-loader");
	loader.style.height = window.innerHeight + "px";
	document.addEventListener('DOMContentLoaded', fade, false);

	function fade() {
	    var op = 1;  // initial opacity
	    var timer = setInterval(function () {
	        if (op <= 0.1){
	            clearInterval(timer);
	            loader.style.display = 'none';
	        }
	        loader.style.opacity = op;
	        loader.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op -= op * 0.2;
	    }, 50);
	}
</script>	

<div id="fullpage">
	<div class="section">
		<div class="slide" id="slide1" data-anchor="1">
			<div class="container">
				<div class="intro">
					<div class="intro__text"><?php echo $lang['intro']; ?></div>
				</div>
			</div>
		</div>

		<div class="slide withBackground" id="slide2" data-anchor="2">
			<div class="container">

				<div class="app">
					<div class="camera">
						<div class="camera__container">
							<div class="message"><?php echo $lang['switch']; ?><div class="desision"><span class="d_button close"><?php echo $lang['close_message']; ?></span><span class="d_button switch"><?php echo $lang['switch_message']; ?></span></div></div>
							<video id="video"></video>

							<div class="drag"><img id="bul1" class="bulli_fridge" src="img/bulli_1.png" /></div>
							
							<div class="captured-image"></div>	
							
							<div class="canvas-container">
								<canvas id="canvas"></canvas>	
								<canvas id="canvas2"></canvas>	
								<canvas id="canvas3"></canvas>	
							</div>
						</div>

						<div class="camera__buttons">
							<div class="button" id="newsnap"><div class="grey"><i class="fa fa-backward"></i></div></div>
							<div class="button animated" id="snap"><div class="blue"><i class="fa fa-camera"></i></div></div>
							<div class="button" id="send"><div class="grey"><i class="fa fa-paper-plane"></i></div></div>
						</div>
					</div>

					<div class="upload">
						<div class="upload__container">
							<div class="uploadmessage">
								<?php echo $lang['camera_not_suported']; ?>
							</div>
							<div class="loader-container1">
								<div class="loader">Loading...</div>
							</div>	
							<div class="hideFileUpload"><input type="file" id="uploadedFile" name="uploadImage"></div>
							<div class="uploadedImageContainer">
								<div id="pf_foto"></div>
								<div class="drag"><img id="bul" class="bulli_fridge" src="img/bulli_1.png" /></div>
							</div>
							
							<div id="image-out"></div>


							<div class="camera__buttons">
								<div class="button" id="newupload"><div class="grey"><i class="fa fa-backward"></i></div></div>
								<div class="button animated" id="upload"><div class="blue"><i class="fa fa-upload"></i></div></div>
								<div class="button" id="sendupload"><div class="grey"><i class="fa fa-paper-plane"></i></div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="slide " id="slide3" data-anchor="3">
			<div class="container">
				<div class="loader-container">
					<div class="loader">Loading...</div>
				</div>	
				<div class="form">
					<div class="form-inner">
						
						<div class="title"><?php echo $lang['form_title']; ?></div>
						<form >
							<input type="text" name="name" placeholder="<?php echo $lang['placeholder_name']; ?>">
							<input type="text" name="surname" placeholder="<?php echo $lang['placeholder_surname']; ?>">
							<input type="email" name="email" placeholder="<?php echo $lang['placeholder_email']; ?>">
							<input id="imagelink" type="hidden" name="image">
						</form>
						<div class="errors"></div>
						<div class="submit"><?php echo $lang['send_button']; ?></div>	
					</div>
				</div>
			</div>
		</div>

		<div class="slide" id="slide4" data-anchor="4">
			<div class="container">

				<div class="thankyou success">
					<span class="icon"><i class="fa "></i></span>
					<div class="title"></div>
					<span><i class="fa fa-backward"></i></span>
					<span><i class="fa fa-facebook-official"></i></span>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script> 

<?php
include 'partials/script.php';
include 'partials/footer.php'; 
?>