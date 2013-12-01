<?php

/* The purpose of this script is to 
 * get the correct info from the data model and return it.
 * to the template. 
 *
*/
require_once('config.php');
require_once('classes/word.php');
require_once('classes/database.php');

// set variables
// We do not want to display the last instance 
// this is the id of the previous instance...
$previous_id = isset($_GET['previous_id']) ? $_GET['previous_id'] : 0;

$word = new VocabWord($db, $previous_id);

// generate the html to send to template...
?>
<h1><?php echo $word->__get('name'); ?></h1>
<ul id="definitionTest">
	
		<?php foreach($word->__get('answers') as $answer): ?>
			<?php $class = ($answer === $word->__get('definition')) ? ' class="correct" ' : ''; ?>
			<li <?php echo($class); ?>><?php echo $answer ?></li>
		<?php endforeach; ?>

	</ul>



