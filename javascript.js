function add(a,b) {
  return a + b;
}

function subtract(a,b) {
  return a - b;
}

function multiply(a,b) {
  return  a * b;
}

function divide(a,b) {
  return a / b;
}

function operate(a, operatorStr, b) {
  switch(operatorStr) {
    case '+':
      return add(a,b);
      break;
    case '-':
      return subtract(a,b);
      break;
    case 'x':
      return multiply(a,b);
      break;
    case '÷':
      return divide(a,b);
      break;
    default:
      return 'ERROR';
      break;
  }
}

let displayStr = '';
let inputArray = [];
function updateDisplay() {
  let displayElement = document.querySelector('.display');
  let text = inputArray.join('');
  text = text.replace(/\+/g, ' + ');
  text = text.replace(/-/g, ' - ');
  text = text.replace(/x/g, ' x ');
  text = text.replace(/÷/g, ' ÷ ');
  displayStr = text;
  if (displayStr == 'Infinity') {
    displayStr = "You know you can't do that";
    inputArray = [];
  }
  displayElement.textContent = displayStr;
}

function organizeInput(inputArray) {
  let organizedInputArray = [];
  let temp = '';
  for (char of inputArray) {
    if (!isNaN(char)) {
      temp = temp + char;
    }
    else {
      organizedInputArray.push(Number(temp));
      temp = '';
      organizedInputArray.push(char);
    }
  }
  organizedInputArray.push(Number(temp));
  return organizedInputArray;
}

let buttons = document.querySelectorAll('button');
for (button of buttons) {
  if (!button.classList.contains('equals') && !button.classList.contains('clear')) {
    button.addEventListener('click', (e) => {
      if (!isNaN(inputArray[inputArray.length - 1] || inputArray === [])) {
        inputArray.push(e.target.textContent);
        updateDisplay();
      } else if (!isNaN(e.target.textContent)) {
        inputArray.push(e.target.textContent);
        updateDisplay();
      }
    });
  } else if (button.classList.contains('equals')) {
    button.addEventListener('click', (e) => {
      inputArray = organizeInput(inputArray);
      console.log(inputArray);
      let result = operate(inputArray[0], inputArray[1], inputArray[2]);
      result = Math.round(result * 1000) / 1000;
      inputArray = [];
      inputArray[0] = result;
      updateDisplay();
    });
  } else if (button.classList.contains('clear')) {
    button.addEventListener('click', (e) => {
      inputArray = [];
      updateDisplay();
    })
  }
}