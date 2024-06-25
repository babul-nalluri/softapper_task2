let display = document.getElementById('display');
let fullDisplay = document.getElementById('full-display');
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function appendNumber(number) {
    if (number === '0' && currentOperand === '0') return;
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateFullDisplay();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateFullDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
    updateFullDisplay(true);
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    fullDisplay.innerText = '';
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentOperand || '0';
}

function updateFullDisplay(isResult = false) {
    if (isResult) {
        fullDisplay.innerText = `${fullDisplay.innerText} = ${currentOperand}`;
    } else {
        fullDisplay.innerText = `${previousOperand} ${operation || ''} ${currentOperand}`;
    }
}
