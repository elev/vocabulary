
// get the child nodes of definitionTest
var answers = document.getElementById('definitionTest').childNodes;

// check if it is the correct answer or not
function answerCorrect(){
	if (this.className == 'correct'){
		console.log('you are correct');
	}else{
		console.log('please try again');
		createOverlay();
	}
}

// remove the overlay
function removeNode(){
	document.body.removeChild(document.getElementById("overlay"));
}

// create an overlay to run when an answer was chosen
function createOverlay(){
	var overlay = document.createElement("div");
	overlay.setAttribute("id", "overlay");
	console.log('create overlay exists');
	document.body.appendChild(overlay);
	// bind a click to remove it.
	overlay.addEventListener('click', removeNode);
}



/**
* loop through the answers nodeList using 
* array's foreach method and assign the
* answer correct function as a click evet
* for every answer.
*/
Array.prototype.forEach.call(answers, function(answer){
	answer.addEventListener('click', answerCorrect);
});