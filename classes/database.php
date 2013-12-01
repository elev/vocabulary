<?php
// create the PDO Object
require_once('../config.php');

$db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
// echo 'd';
// $stmt = $db->prepare('SELECT v_word_name, v_word_definition, v_word_type FROM v_word WHERE v_word_id = :id');
// $v_word_id = '2';
// $stmt->bindParam(':id', $v_word_id, PDO::PARAM_INT);
// $stmt->execute();
// print_r($stmt->fetchALL());
?>