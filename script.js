let display = document.getElementById("display");
let historyDisplay = document.getElementById("history");
let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;
let angleMode = "DEG"; // DEG or RAD

function updateDisplay() {
  display.textContent = currentInput;
}

function updateHistory(text) {
  historyDisplay.textContent = text;
}

function switchMode(mode) {
  const scientificButtons = document.getElementById("scientificButtons");
  const tabBtns = document.querySelectorAll(".tab-btn");

  tabBtns.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  if (mode === "scientific") {
    scientificButtons.classList.add("active");
  } else {
    scientificButtons.classList.remove("active");
  }
}

function toggleRadDeg() {
  angleMode = angleMode === "DEG" ? "RAD" : "DEG";
  event.target.textContent = angleMode;
  updateHistory(`Mode: ${angleMode}`);
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function appendNumber(num) {
  if (shouldResetDisplay) {
    currentInput = num;
    shouldResetDisplay = false;
  } else {
    if (currentInput === "0" && num !== ".") {
      currentInput = num;
    } else if (num === "." && currentInput.includes(".")) {
      return;
    } else {
      currentInput += num;
    }
  }
  updateDisplay();
  updateHistory("");
}

function appendOperator(op) {
  if (shouldResetDisplay && operator) {
    operator = op;
    return;
  }

  if (previousInput === "" || shouldResetDisplay) {
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    updateHistory(`${previousInput} ${getOperatorSymbol(op)}`);
  } else if (operator) {
    calculate();
    operator = op;
    shouldResetDisplay = true;
    updateHistory(`${previousInput} ${getOperatorSymbol(op)}`);
  }
}

function getOperatorSymbol(op) {
  const symbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
    "**": "x^y",
  };
  return symbols[op] || op;
}

function appendFunction(func) {
  const value = parseFloat(currentInput);
  let result;

  try {
    switch (func) {
      case "sin":
        result =
          angleMode === "DEG" ? Math.sin(toRadians(value)) : Math.sin(value);
        updateHistory(`sin(${currentInput})`);
        break;
      case "cos":
        result =
          angleMode === "DEG" ? Math.cos(toRadians(value)) : Math.cos(value);
        updateHistory(`cos(${currentInput})`);
        break;
      case "tan":
        result =
          angleMode === "DEG" ? Math.tan(toRadians(value)) : Math.tan(value);
        updateHistory(`tan(${currentInput})`);
        break;
      case "asin":
        result =
          angleMode === "DEG" ? toDegrees(Math.asin(value)) : Math.asin(value);
        updateHistory(`asin(${currentInput})`);
        break;
      case "acos":
        result =
          angleMode === "DEG" ? toDegrees(Math.acos(value)) : Math.acos(value);
        updateHistory(`acos(${currentInput})`);
        break;
      case "atan":
        result =
          angleMode === "DEG" ? toDegrees(Math.atan(value)) : Math.atan(value);
        updateHistory(`atan(${currentInput})`);
        break;
      case "sqrt":
        result = Math.sqrt(value);
        updateHistory(`√(${currentInput})`);
        break;
      case "log":
        result = Math.log10(value);
        updateHistory(`log(${currentInput})`);
        break;
      case "ln":
        result = Math.log(value);
        updateHistory(`ln(${currentInput})`);
        break;
      case "reciprocal":
        result = 1 / value;
        updateHistory(`1/${currentInput}`);
        break;
      case "factorial":
        result = factorial(Math.floor(value));
        updateHistory(`${currentInput}!`);
        break;
      case "percent":
        result = value / 100;
        updateHistory(`${currentInput}%`);
        break;
      default:
        return;
    }

    currentInput = Math.round(result * 1000000000000) / 1000000000000; // Round to avoid floating point errors
    currentInput = currentInput.toString();
    shouldResetDisplay = true;
    updateDisplay();
  } catch (error) {
    currentInput = "Error";
    updateDisplay();
    updateHistory("Invalid operation");
  }
}

function factorial(n) {
  if (n < 0) throw new Error("Factorial of negative number");
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function calculate() {
  if (previousInput === "" || operator === "" || shouldResetDisplay) {
    return;
  }

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  try {
    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = current !== 0 ? prev / current : "Error";
        break;
      case "**":
        result = Math.pow(prev, current);
        break;
      default:
        return;
    }

    if (result === "Error") {
      currentInput = "Error";
    } else {
      currentInput = Math.round(result * 1000000000000) / 1000000000000;
      currentInput = currentInput.toString();
    }

    updateHistory(`${prev} ${getOperatorSymbol(operator)} ${current} =`);
    operator = "";
    previousInput = "";
    shouldResetDisplay = true;
    updateDisplay();
  } catch (error) {
    currentInput = "Error";
    updateDisplay();
    updateHistory("Calculation error");
  }
}

function clearDisplay() {
  currentInput = "0";
  previousInput = "";
  operator = "";
  shouldResetDisplay = false;
  updateDisplay();
  updateHistory("");
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

// Initialize display
updateDisplay();
