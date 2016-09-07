<?php 
	include 'partials/header.php'; 
	include_once 'database.php';

	$page = isset($_GET["p"]) ? $_GET["p"] : 0;
	$lang = isset($_GET["lang"]) ? $_GET["lang"] : "si";
	$limit = ($page > 1) ? "LIMIT 12 OFFSET " . $page * 12 . "" : "LIMIT 12";
	$query = $db->prepare("SELECT name FROM images ORDER BY date_added DESC " . $limit ."" );
	$query->execute();
	$images = $query->fetchAll();

	$query = $db->prepare("SELECT COUNT(id) FROM images");
	$query->execute();
	$numOfRecords = $query->fetch()[0];
?>
<div class="gallery-wrapper">
	<div class="gallery">
		<?php foreach ($images as $image) { ?>

			<div class="image"><a href="img/uploads/<?php echo $image["name"]; ?>" data-lightbox="gallery"><div class="back" style="background-image: url('img/uploads/<?php echo $image["name"]; ?>');"> </div></a></div>
			
		<?php } ?>
	</div>
	<div class="pagination">
		<div class="pagination-container">
		<?php 
			$numOfPages = ceil($numOfRecords / 12);
		
			for ($i = 1; $i < $numOfPages; $i++) {
				echo '<span><a ' . ($page == $i ? 'class="active"' : '') . ' href="gallery.php?p=' . $i . '&lang=' . $lang . '">' . $i . '</a></span>';
			}
		 ?>
		</div>
	</div>
</div>

<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script> 
<script type="text/javascript" src="js/modules/lightbox-plus-jquery.js"></script>
<script>
    (function($) {

		lightbox.option({
	      'resizeDuration': 200,
	      'wrapAround': true
	    })

		var reinitTimer;

		init();

	    $(window).resize(function () {
	        clearTimeout(reinitTimer);
	        reinitTimer = setTimeout(init, 100);
	    });

	    function init() {
	    	$('.image div').height($('.image').width());    	
	    }

    })(jQuery)
</script>

<?php include 'partials/footer.php'; ?>