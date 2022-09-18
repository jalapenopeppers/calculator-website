function add(a,b) {
  return Number(a) + Number(b);
}

function subtract(a,b) {
  return Number(a) - Number(b);
}

function multiply(a,b) {
  return Number(a) * Number(b);
}

function divide(a,b) {
  return Number(a) / Number(b);
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
    if (!isNaN(char) || char === '.') {
      temp = temp + char;
    }
    else {
      organizedInputArray.push(temp);
      temp = '';
      organizedInputArray.push(char);
    }
  }
  organizedInputArray.push(temp);
  return organizedInputArray;
}

let buttons = document.querySelectorAll('button');
for (button of buttons) {
  button.addEventListener('mousedown', (e) => {
    e.target.classList.add('pressed');
  });
  button.addEventListener('mouseup', (e) => {
    e.target.classList.remove('pressed');
  });
  if (!isNaN(button.textContent)) {
    button.addEventListener('click', (e) => {
      inputArray.push(e.target.textContent);
      updateDisplay();
      });
  } else if (button.classList.contains('addition') ||
             button.classList.contains('subtraction') ||
             button.classList.contains('multiplication') ||
             button.classList.contains('division')) {
    button.addEventListener('click', (e) => {
      if (!isNaN(inputArray[inputArray.length - 1]) && inputArray !== []) {
        inputArray.push(e.target.textContent);
        updateDisplay();
      }
    });
  } else if (button.classList.contains('equals')) {
    button.addEventListener('click', (e) => {
      inputArray = organizeInput(inputArray);
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
  } else if (button.classList.contains('decimal')) {
    button.addEventListener('click', (e) => {
      //temporary array used to avoid reorganizing inputArray until needed
      let tempArray = organizeInput(inputArray);
      if (!isNaN(inputArray[inputArray.length - 1]) && inputArray !== [] && !tempArray[tempArray.length - 1].toString().includes('.')) {
        inputArray.push('.');
        updateDisplay();
      }
    })
  } else if (button.classList.contains('delete')) {
    button.addEventListener('click', (e) => {
      inputArray.pop();
      updateDisplay();
    })
  }
}