<?php
/**
* This is the index file. Lets keep this short and sweet.
* This will be a view template that calls logic from javascript and 
* The php word model.
*/
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Vocabulary Builder</title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.css">
		<link rel="stylesheet" type="text/css" href="css/index.css">
	</head>
	<body>
		<div id="content">	
			<header>
				<h2>Welcome to my vocabulary building site,
					I hope you find it fun and useful!</h2>
			</header>
			<div id="main">
				<?php include_once('ajax.php'); ?>
			</div>
		</div>
		<script src="js/scripts.js" type="text/javascript"></script>
	</body>
</html>
