const containerNames = ["inputContainer", "buttonContainer", "topFuncContainer", "numContainer", "rightOperatorContainer",]

// buttons are listed out of order so that they align with rows. top: 7, 8, 9 next: 4, 5, 6 next: 1, 2, 3, last: decimal, 0, enter.
const buttonNames = [ "seven", "eight", "nine", "four", "five", "six", "one", "two", "three", "decimal", "zero", "enter", "plus", "minus", "divide", "multiply", "backspace", "clear"];
const buttonText = [ "7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "enter", "+", "-", "/", "*", "backspace", "clear",];
const textFields = [ "displayEquation", "displayTotal",];

const displayText = {
    total: "",
    firstNumber: "test",
    operator: "*",
    secondNumber: "",
    activeNumberField: 2,
    equation() {
      return `${this.firstNumber} ${this.operator} ${this.secondNumber}`;
    },
}




const createElement = function( element, className, textContent, appendTo) {
  const elem = document.createElement(element);
  const parent = document.querySelector(`${appendTo}`);

  elem.classList.add(className);
  elem.textContent = textContent;
  parent.appendChild(elem);

}

const createCalculator = function() {
createContainers();
createButtons();
createTextFields();
};

function createContainers(){
  for (container of containerNames) {
    // inputContainer and buttonContainer are primary containers, the last 3 containers are sub containers of buttonContainer thus the check.
    let parentElement = ( container === "inputContainer" || container === "buttonContainer") ? ".container" : ".buttonContainer" ; 
    createElement( "div", container, "", parentElement);
  };
};

function createButtons() { 
  let parentElement = "";
  let listenerSort = "";
  for (let i = 0; i < (buttonNames.length); i++) {
    // 0-11 are nums decimal and enter
    if (i < 12) {
     parentElement = ".numContainer";
     listenerSort = "num"
     // 12-16 operators
    } else if (i < 16) {
    parentElement = ".rightOperatorContainer";
    listenerSort = "operator";
    } else {
      // everything else goes in the top box, should be backspace and clear commands
      parentElement = ".topFuncContainer";
      listenerSort = "delete";
    };
    const className = buttonNames[i];
    const text = buttonText[i];
    createElement( "button", className, text, parentElement);
  };
};

function createTextFields() {
  for (field of textFields) {
    createElement("div", field, "so I can visually see", ".inputContainer");
  };
};

createCalculator();

// need multiple types of event listeners:
// number buttons => add their textcontent to either firstNumber or secondNumber. will also need to call equation() ( num , text) decimal will be the same, decimal will need to call a check function 
// operator buttons => add their textcontent to displayText.operator , toggle variable to point to secondNumber for text
// enter button => use operator to determine which function to call for math and update total
// backspace => remove 1 char from active string, if that string is string2 and at 0 then it will need to remove the operator and set active string to 1.
// clear => set total, firstnum, operator, secondnum to "" and set active string to 1.

function setActiveNumberField() {
  // if an operator is entered switch to entering the second number
  if (displayText.operator === "") {
    displayText.activeNumberField = 1;
  } else {
    displayText.activeNumberField = 2;
  }
}

function backspace() {
  let modify;
  switch (displayText.activeNumberField) {
    case 1:
      modify = "firstNumber";
      break;
    case 2:
      // if secondNumber is empty delete the operator instead
      if (displayText.secondNumber.length === 0) {
        modify = "operator";
      } else {
        modify = "secondNumber";
      }
      setActiveNumberField();
      break;
  }
  const allButLastChar = displayText[modify].length -1;
  displayText[modify] = displayText[modify].slice(0, allButLastChar);
  updateDisplay()
}

function clear() {
  displayText.total = "";
  displayText.firstNumber = "";
  displayText.operator = "";
  displayText.secondNumber = "";
  setActiveNumberField();
  updateDisplay();
}

function updateDisplay() {
  const equation = document.querySelector(".displayEquation");
  const total = document.querySelector(".displayTotal");
  equation.textContent = displayText.equation();
  total.textContent = displayText.total;
}

function enter() {
  let num1, num2;
  if (isEitherAFloat === true) {
    num1 = parseFloat(displayText.firstNumber);
    num2 = parseFloat(displayText.secondNumber);
  } else {
    num1 = parseInt(displayText.firstNumber);
    num2 = parseInt(displayText.secondNumber);
  }
  switch (displayText.operator) {
    case "+":
      add(num1, num2);
      break;
    case "-":
      subtract(num1, num2);
      break;
    case "*":
      multiply(num1, num2);
      break;
    case "/":
      divide(num1, num2);
      break;
  }
  updateDisplay();
}

function add(num1, num2) {
  displayText.total = num1 + num2;
}

function subtract(num1, num2) {
  displayText.total = num1 - num2;
}

function multiply(num1, num2) {
  displayText.total = num1 * num2;
}

function divide(num1, num2) {
  displayText.total = num1 / num2;
}

function isEitherAFloat () {
  return ( displayText.firstNumber.includes(".") || displayText.secondNumber.includes("."))
}