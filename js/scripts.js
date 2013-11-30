// state tracks whether a wrong or correct answer is selected
var state = false;

// messageHTML is what message to display to the user depending on page state.
var messageHTML = '';

// remove the overlay
function removeNode(){
	document.body.removeChild(document.getElementById("overlay"));
	if (state === true) {
		makeRequest();
	}
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
	if (this.className == "correct") {
		messageHTML = "You are correct!";
		state = true;
	}else{
		messageHTML = "You are wrong, please try again.";
	}
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
// get the child nodes of definitionTest
var answers = document.getElementById('definitionTest').childNodes;

Array.prototype.forEach.call(answers, function(answer){
	answer.addEventListener('click', createOverlay);
});

// Ajax Call, using regular javascript, does not currently
// support older versions of IE;
function makeRequest(){	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				console.log(httpRequest.responseText);
			}else{
				console.log("there was a server error");
			}
		}
	}
	httpRequest.open('GET', 'ajax.php', true);
	httpRequest.send(null);
}

// document.getElementById("opp").onclick = function(){ 
// 	makeRequest(); };