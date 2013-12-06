// state tracks whether a wrong or correct answer is selected
var state = false;

// messageHTML is the message to display to the user depending on page state.
var messageHTML = '';

// black overlay that will eventually be added
// this is a dom element that does not exist on init
var overlay = '';

// textBox that will be added to the overlay
// this is a dom element that doesn't exist on init
var overText = '';

// this is a node list of answers,
// it will be repopulated with ajax each iteration.
var answers = '';


// fade out
function fadeOut() {
	overlay = document.getElementById('overlay');
	overText = document.getElementById('overText');
	var op = .7;  // initial opacity
	var timer = setInterval(function () {
		if (op <= 0.1){
			clearInterval(timer);
			document.body.removeChild(overlay);
			document.body.removeChild(overText);
		}
		op -=  0.05;
		overlay.style.opacity = op;
		overText.style.opacity = op;
	}, 20);
}

function fadeIn(element, finalOp) {
	var op = 0;  // initial opacity
	var timer = setInterval(function () {
		if (op >= finalOp){
			clearInterval(timer);
		}
		element.style.opacity = op;
		op += 0.05;
	}, 20);
}


// // remove the overlay, if we're in a correct state make an ajax call
// // to change the main page content
function removeNode(){
	fadeOut();
	if (state === true) {
		makeRequest();
	}
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
	overlay = document.createElement("div");
	overlay.setAttribute("id", "overlay");
	document.body.appendChild(overlay);
	fadeIn(overlay, 0.7);

	// create the text area...
	overText = document.createElement("div");
	overText.setAttribute("id", "overText");
	overText.innerHTML= messageHTML;
	document.body.appendChild(overText);
	fadeIn(overText, 1);
	// bind a click to remove it.
	overlay.addEventListener('click', removeNode);
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

// /**
// * loop through the answers nodeList using 
// * array's foreach method and assign the
// * createOverlay function as a click event
// * for every answer.
// */
// // get the child nodes of definitionTest
function bindAnswers(){
	answers = document.getElementById('definitionTest').childNodes;

	Array.prototype.forEach.call(answers, function(answer){
		answer.addEventListener('click', createOverlay);
	});
}


// on initial page load, bind click event to the answers.
bindAnswers();