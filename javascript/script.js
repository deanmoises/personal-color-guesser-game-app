// Declared Variables
var numSquares = 6;
var colors = [];
var pickedColor;

// Selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// Initialize the program, via setting up the sequence
// Setup the modes of the game, color selection, and reset button
init();

function init(){
	// Mode buttons event listeners
	setupModeButtons();
	setupSquares();
	reset();
}

// Functions

// Game Modes
function setupModeButtons() {
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

// Squares Logic and Functions
function setupSquares(){
	for(var i = 0; i < squares.length; i++) {
	// add initial colors to squares
	// squares[i].style.backgroundColor = colors[i]; 
	// add click listeners to squares
	squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedcolor
			// console.log(clickedColor, pickedColor)
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";	
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

// Reset/Play Again Button
function reset(){
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change color of squares
	// colorDisplay.textContent = pickedColor;
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	// change colors of squares from the page
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		};
	}
	h1.style.backgroundColor = "steelblue";
}

// Selector for Reset/Play Again Button
resetButton.addEventListener("click", function(){
	reset()
})

// Looping Through the squares element vor color variation
function changeColors(color) {
	// loop through all squares
	for(var i = 0; i < colors.length; i++) {
	// change each color to match given color
	squares[i].style.backgroundColor = color;
	}
}

// For user's input color
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Generating colors for each squares
function generateRandomColors(num){
	// make an array
	var arr = [];
	// add num random colors to array
	for(var i = 0; i < num; i++){
		// get random color and push into array
		arr.push(randomColor());
	}
	// return that array
	return arr;
}

// For formatting the result of randomly generated rgb color values
function randomColor() {
	// pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	// "rgb(r, g, b)"
	// The tricky bug mentioned here is the space after the comma
	// This is for JavaScript comparison since it is strick in formatting
	return "rgb(" + r + ", " + g + ", " + b + ")";
}



// 