// state tracks whether a wrong or correct answer is selected
var state = false;

// messageHTML is the message to display to the user depending on page state.
var messageHTML = '';

// fade out
function fadeOut(element, op) {
	var op = .7;  // initial opacity
	var timer = setInterval(function () {
		if (op <= 0.1){
			clearInterval(timer);
			document.body.removeChild(element);
		}
		element.style.opacity = op;
		op -=  .1;
	}, 10);
}

function fadeIn(element, finalOp) {
	var op = 0;  // initial opacity
	var timer = setInterval(function () {
		if (op == finalOp){
			clearInterval(timer);
		}
		element.style.opacity = op;
		op += .1;
	}, 20);
}


// remove the overlay, if we're in a correct state make an ajax call
// to change the main page content
function removeNode(){
	fadeOut(document.getElementById("overlay"));
	fadeOut(document.getElementById("overText"));
	if (state === true) {
		makeRequest();
	}
}

// creates a message box
function createMessageBox(text){
	var messageBox = document.createElement("div");
	messageBox.setAttribute("id", "overText");
	messageBox.innerHTML= text;

	// creates the closing circle, appends it to the message box
	var circle = document.createElement("div");
	circle.setAttribute("class", "circle");
	circle.innerHTML= "X";
	messageBox.appendChild(circle);
	return messageBox;
}

// create an overlay to run when an answer was chosen
function createOverlay(){
	// change message and page state
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
	fadeIn(overlay, .7);

	// create the text area...
	document.body.appendChild(createMessageBox(messageHTML));
	fadeIn(document.getElementById('overText'), 1);
	// bind a click to remove it.
	overlay.addEventListener('click', removeNode);
}



/**
* loop through the answers nodeList using 
* array's foreach method and assign the
* createOverlay function as a click event
* for every answer.
*/
// get the child nodes of definitionTest
function bindAnswers(){
	var answers = document.getElementById('definitionTest').childNodes;

	Array.prototype.forEach.call(answers, function(answer){
		answer.addEventListener('click', createOverlay);
	});
}

// Ajax Call, using regular javascript, does not currently
// support older versions of IE;
function makeRequest(){	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		var response = '';
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				response = httpRequest.responseText;
				state = false;
			}else{
				response = "there was a server error, please reload the page";
			}
			document.getElementById('main').innerHTML = response;
			bindAnswers();
		}
	}
	httpRequest.open('GET', 'ajax.php', true);
	httpRequest.send(null);
}

// on initial page load, bind click event to the answers.
bindAnswers();