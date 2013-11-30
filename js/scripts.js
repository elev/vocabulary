
// get the child nodes of definitionTest
var answers = document.getElementById('definitionTest').childNodes;

// remove the overlay
function removeNode(){
	document.body.removeChild(document.getElementById("overlay"));
}

// creates a message box
function createMessageBox(text){
	var messageBox = document.createElement("div");
	messageBox.setAttribute("id", "overText");
	messageBox.innerHTML= text;

	//creates the closing circle, appends it to the message box
	var circle = document.createElement("div");
	circle.setAttribute("class", "circle");
	circle.innerHTML= "X";
	messageBox.appendChild(circle);
	return messageBox;
}

// create an overlay to run when an answer was chosen
function createOverlay(){
	var messageHTML = this.className == "correct" ? 
		"You are correct!" : "You are wrong, please try again.";
	// create and add the overlay
	var overlay = document.createElement("div");
	overlay.setAttribute("id", "overlay");
	document.body.appendChild(overlay);

	// create the text area...
	overlay.appendChild(createMessageBox(messageHTML));

	// bind a click to remove it.
	overlay.addEventListener('click', removeNode);
}



/**
* loop through the answers nodeList using 
* array's foreach method and assign the
* answer correct function as a click event
* for every answer.
*/
Array.prototype.forEach.call(answers, function(answer){
	answer.addEventListener('click', createOverlay);
});