// create elements - 4 container elements (input, left-side buttons => top / bot, r-side buttons) butt 0-9, operators ( + - * ** / = )
// lets hold everything that I need to create in an array, then just loop through the array and generate each index as an element.
// can probably also do the same thing with 
// for the start I'll go with creating a div that just holds what is typed
// later might move that to an input field.

const containerNames = ["inputContainer", "buttonContainer", "topFuncContainer", "numContainer", "rightOperatorContainer",]

// buttons are listed out of order so that they align with rows. top: 7, 8, 9 next: 4, 5, 6 next: 1, 2, 3, last: decimal, 0, enter.
const buttonNames = [ "seven", "eight", "nine", "four", "five", "six", "one", "two", "three", "decimal", "zero", "enter", "plus", "minus", "divide", "multiply", "backspace", "clear"];
const buttonText = [ "7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "enter", "+", "-", "/", "*", "backspace", "clear",];

const createElement = function( element, className, textContent, appendTo) {
  const elem = document.createElement(element);
  const parent = document.querySelector(`${appendTo}`);

  elem.classList.add(className);
  elem.textContent = textContent;
  parent.appendChild(elem);

}

function createCalculatorLayout () {
  let parentElement = "";

  for (container of containerNames) {
    // inputContainer and buttonContainer are primary containers, the last 3 containers are sub containers of buttonContainer thus the check.
    parentElement = ( container === containerNames[0] || container === containerNames[1]) ? ".container" : ".buttonContainer" ; 
   console.log(parentElement);

   createElement( "div", container, "", parentElement);
  }

  
  for (let i = 0; i < (buttonNames.length); i++) {
    // 0-11 are nums decimal and enter
    if (i < 12) {
     parentElement = ".numContainer";
     // 12-16 operators
    } else if (i < 16) {
    parentElement = ".rightOperatorContainer";
    } else {
      // everything else goes in the top box, should be backspace and clear commands
      parentElement = ".topFuncContainer";
    };
    const className = buttonNames[i];
    const text = buttonText[i];
    createElement( "button", className, text, parentElement);
  }


}

createCalculatorLayout();