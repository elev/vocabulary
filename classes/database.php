<?php
// create the PDO Object
require_once('config.php');
$db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
?>
