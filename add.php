<?php 

require_once "database.php";
if ( isset($_GET['lang']) && file_exists('includes/languages/'.$_GET['lang'].'.php') ){
  include_once('languages/'.$_GET['lang'].'.php');
} else {
  include_once('languages/sl.php');
}


$userData["firstname"] = htmlentities(isset($_POST["name"]) ? $_POST["name"] : "", ENT_QUOTES);
$userData["lastname"] = htmlentities(isset($_POST["surname"]) ? $_POST["surname"] : "", ENT_QUOTES);
$userData["email"] = htmlentities(isset($_POST["email"]) ? $_POST["email"] : "", ENT_QUOTES);
$userData["image"] = htmlentities(isset($_POST["image"]) ? $_POST["image"] : "", ENT_QUOTES);

foreach ($userData as $key => $value) {
	if ($value == "")
		return;
}

$userId = userExists($userData["email"], $db);

$filename = convertBase64ToPng($userData, $userId, $db);

if ($filename == "")
	return $lang['send_error'];

if ($userId > 0) 
	addImage($filename, $userId, $db);

echo $lang['send_success'];


function userExists($email, $db) {
	$query = $db->prepare("SELECT id FROM users WHERE email = '" . $email . "'");
	$query->execute();
	$id = $query->fetch();
	return ($id[0] > 0) ? $id[0] : 0;
}

function convertBase64ToPng($userData, $userId, $db) {

	if ($userId == 0) 
		$userId = addNewUser($userData, $db);

	$filename = $userId . "_" . time() . ".png";

	$output_file = "img/uploads/" . $filename;
	$ifp = fopen($output_file, "wb"); 

    $data = explode(',', $userData['image']);

    if (count($data) > 1){
        fwrite($ifp, base64_decode($data[1])); 
        fclose($ifp); 

        return $filename; 
    }

    return "";
}

function addImage($filename, $userId, $db) {
	$query = $db->prepare("INSERT INTO images (name, date_added, userid) VALUES (:name, :date_added, :userid)");
	$query->execute([
		'name' 		 => $filename,
		'date_added' => date("Y-m-d H:i:s"),
		'userid' 	 => $userId
	]);
}

function addNewUser($userData, $db) {
	$query = $db->prepare("INSERT INTO users (firstname, lastname, email) VALUES (:firstname, :lastname, :email)");
	$dbObject = $query->execute([
		'firstname' => $userData["firstname"],
		'lastname' 	=> $userData["lastname"],
		'email' 	=> $userData["email"]
	]);

	return $db->lastInsertId();
}

function lastInsertId($db) {
	/*$lastId = $db->prepare('SELECT MAX(id) FROM users');
	$lastId ->execute();
	$last = $lastId->fetch();
	echo $last;
	return;*/
	return $db->lastInsertId();
} 


