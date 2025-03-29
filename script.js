// create elements - 4 container elements (input, left-side buttons => top / bot, r-side buttons) butt 0-9, operators ( + - * ** / = )
// lets hold everything that I need to create in an array, then just loop through the array and generate each index as an element.
// can probably also do the same thing with 
// for the start I'll go with creating a div that just holds what is typed
// later might move that to an input field.

const containerArray = ["input", "left-side", "right-side", "numKeys", "topRow",]


function createElement( element, className, textContent, appendTo) {

  const container = document.querySelector(".container");
  const elem = document.createElement(element);

  elem.classList.add(className);
  elem.textContent = textContent;

  if (!appendTo) {
    const parent = container;
    parent.appendChild(elem);
  } else {
    const parent = document.querySelector(appendTo);
    parent.appendChild(elem);
  };

}

function test () {
  for (container of containerArray) {
    createElement( "div", container, "",);
  }
}

test();