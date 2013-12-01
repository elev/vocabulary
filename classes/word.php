<?php
	require_once('../config.php');
	require_once('database.php');
	/**
	* retreices words and their definitions from a database
	* @defintion string 
	* @name string
	* @type string
	*/
	class VocabWord{
		
		private $name = '';
		private $defintion = '';
		private $type = '';

		function __construct($db, $not){
			// SELECT RANDOM FROM TABLE WHERE NOT NOT
			// LOOP AND SET Variables
			$stmt = $db->prepare('SELECT v_word_name, v_word_definition, v_word_type FROM v_word WHERE v_word_id <> :id ORDER BY RAND() LIMIT 1');
			$stmt->bindParam(':id', $not, PDO::PARAM_INT);
			$stmt->execute();
			$results = $stmt->fetch();

			$this->name = $results['v_word_name'];
			$this->definition = $results['v_word_definition'];
			$this->type = $results['v_word_type'];
		}

		function __get($prop){
			return $this->$prop;
		}
	}

	$the_word = new VocabWord($db, 3);

	//echo $isIt->__get('name');
?>