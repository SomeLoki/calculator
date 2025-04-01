const containerNames = ["inputContainer", "buttonContainer", "topFuncContainer", "numContainer", "rightOperatorContainer",]
// buttons are listed out of order so that they align with rows. top: 7, 8, 9 next: 4, 5, 6 next: 1, 2, 3, last: decimal, 0, enter.
const buttonNames = [ "seven", "eight", "nine", "four", "five", "six", "one", "two", "three", "decimal", "zero", "enter", "multiply", "divide", "subtract", "add", "backspace", "clear"];
const buttonText = [ "7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "enter", "*", "/", "-", "+", "backspace", "clear",];
const textFields = [ "displayTotal","displayEquation",];

const displayText = {
    total: "",
    firstNumber: "",
    operator: "",
    secondNumber: "",
    activeNumberField: 1,
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

const createContainers = function(){
  for (container of containerNames) {
    // inputContainer and buttonContainer are primary containers, the last 3 containers are sub containers of buttonContainer thus the check.
    let parentElement = ( container === "inputContainer" || container === "buttonContainer") ? ".container" : ".buttonContainer" ; 
    createElement( "div", container, "", parentElement);
  };
};

const attachEventListener = function(elementSelector, index, typeOfItem) {
  const element = document.querySelector(`.${elementSelector}`);

  switch (typeOfItem) {
    case "num":
      // 0-8 is num 1-9, 10 is 0.
      if (index < 9 || index === 10) {
        createNumListener(element);
        // 11 is enter
      } else if (index === 11) {
        createEnterListener(element);
              // 9 is decimal
          } else if (index === 9) {
            createDecimalListener(element);
          };
      break;
    case "operator":
      // all operators do the same thing
      createOperatorListener(element);
      break;
    case "remove":
      if (index === 16) {
        createBackspaceListener(element);
      } else {
        createClearListener(element);
      }
      break;
  }
}

const createButtons = function() { 
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
      listenerSort = "remove"
    };
    const className = buttonNames[i];
    const text = buttonText[i];
    createElement( "button", className, text, parentElement);
    attachEventListener(className, i, listenerSort);
  };
};

const createTextFields = function() {
  for (field of textFields) {
    createElement("div", field, "", ".inputContainer");
  };
};

const createCalculator = function() {
createContainers();
createButtons();
createTextFields();
};


function createNumListener(elementSelector) {
  elementSelector.addEventListener("click", function() {
    // resets display if a calculation was already ran
    if (displayText.total !== "") {
      clear();
    };
    const textIndex = buttonNames.indexOf(this.className);
    const activeNumField = (displayText.activeNumberField === 1) ? "firstNumber" : "secondNumber";
    displayText[activeNumField] += buttonText[textIndex];
    updateDisplay();
  });
};

function createEnterListener(elementSelector) {
  elementSelector.addEventListener("click", function () {
    if (isDivisionByZero() || isAnyFieldEmpty()) {
      return;
    }
    enter();
  });
}

function isDivisionByZero() {
  if (displayText.operator === "/") {
    return ( displayText.firstNumber === "0" || displayText.secondNumber === "0" );
  }
  // if the operator isn't division then this is false
  return false;
};

function isAnyFieldEmpty() {
  return (!displayText.firstNumber || !displayText.operator || !displayText.secondNumber)
};

function createDecimalListener(elementSelector) {
  elementSelector.addEventListener("click", () => {
    const activeNumField = (displayText.activeNumberField === 1) ? "firstNumber" : "secondNumber";
    if (displayText[activeNumField].includes(".")) {
      return;
    }
    displayText[activeNumField] += ".";
    updateDisplay();
  });
};

function createOperatorListener(elementSelector) {
  elementSelector.addEventListener("click", function() {
    // handles shifting total to first number if an operator entered while total is full.
    if (displayText.total !== "") {
      const tempStr = displayText.total;
      clear();
      displayText.firstNumber = tempStr;
    };
    const textIndex = buttonNames.indexOf(this.className);
    displayText.operator = buttonText[textIndex];
    updateDisplay();
    setActiveNumberField();
  });
};

function createBackspaceListener(elementSelector) {
  elementSelector.addEventListener("click", backspace);
};

function createClearListener(elementSelector) {
  elementSelector.addEventListener("click", clear);
};

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
  // if a calculation has just been run, remove the total and let you edit the 2nd number
  if (displayText.total !== "") displayText.total = "";
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
  if (isEitherAFloat) {
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

createCalculator();