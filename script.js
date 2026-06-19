let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(num) {
  if (shouldResetDisplay) {
    currentInput = num;
    shouldResetDisplay = false;
  } else {
    if (currentInput === '0' && num !== '.') {
      currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
      return;
    } else {
      currentInput += num;
    }
  }
  updateDisplay();
}

function appendOperator(op) {
  if (shouldResetDisplay && operator) {
    operator = op;
    return;
  }
  
  if (previousInput === '' || shouldResetDisplay) {
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
  } else if (operator) {
    calculate();
    operator = op;
    shouldResetDisplay = true;
  }
}

function calculate() {
  if (previousInput === '' || operator === '' || shouldResetDisplay) {
    return;
  }
  
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 'Error';
      break;
    default:
      return;
  }
  
  currentInput = result.toString();
  operator = '';
  previousInput = '';
  shouldResetDisplay = true;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = '';
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateDisplay();
}

// Initialize display
updateDisplay();