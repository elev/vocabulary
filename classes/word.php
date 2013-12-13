<?php
	require_once('database.php');
	/**
	* retrieves words and their definitions from a database
	* @defintion string 
	* @name string
	* @type string
	* @incorrects array
	*/
	class VocabWord{
		
		private $name = '';
		private $definition = '';
		private $type = '';
		private $incorrects = array();
		private $answers = array();

		function __construct($db, $previous_id){
			// get properties
			$stmt = $db->prepare('SELECT v_word_name, v_word_definition, v_word_type FROM v_word WHERE v_word_id <> :id ORDER BY RAND() LIMIT 1');
			$stmt->bindParam(':id', $previous_id, PDO::PARAM_INT);
			$stmt->execute();
			$results = $stmt->fetch();

			$this->name = $results['v_word_name'];
			$this->definition = $results['v_word_definition'];
			$this->type = $results['v_word_type'];

			// set up the answers array
			$stmt = $db->prepare('SELECT v_word_definition FROM v_word WHERE v_word_name <> :name ORDER BY RAND() LIMIT 3');
			$stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
			$stmt->execute();
			$results = $stmt->fetchAll();
			foreach($results as $res){
				$this->incorrects[] = $res['v_word_definition'];
			}
			$this->answers = $this->incorrects;
			$this->answers[] = $this->definition;
			shuffle($this->answers);
		}

		function __get($prop){
			return $this->$prop;
		}
	}

	$the_word = new VocabWord($db, 3);

?>
