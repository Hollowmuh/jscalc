let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let calculationJustMade = false;
let decimalCount = 0;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    calculationJustMade = false;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForSecondOperand ||calculationJustMade)  {
        displayValue = number;
        waitingForSecondOperand = false;
        calculationJustMade = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}
function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}
function deleteNumber() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}
function appendOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calculate(first, second, op) {
    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            if (second === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return 0;
            }
            return first / second;
        default:
            return second;
    }
}

function calculateResult() {
    if (!operator || waitingForSecondOperand) {
        return;
    }


    const inputValue = parseFloat(displayValue);
    const result = calculate(firstOperand, inputValue, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    calculationJustMade = true;
    updateDisplay();
}

document.addEventListener('keydown', (event) => {
    // Numbers
    if (/^[0-9]$/.test(event.key)) {
        appendNumber(event.key);
    }
    // Operators
    switch (event.key) {
        case '+':
            appendOperator('+');
            break;
        case '-':
            appendOperator('-');
            break;
        case '*':
            appendOperator('*');
            break;
        case '/':
            appendOperator('/');
            break;
        case '%':
            appendOperator('%');
            break;
        case '^':
            appendOperator('**');
            break;
        // Special keys
        case 'Enter':
        case '=':
            calculateResult();
            break;
        case 'Backspace':
            deleteNumber();
            break;
        case 'Delete':
        case 'Escape':
            clearDisplay();
            break;
        case '.':
            appendDecimal();
            break;
    }
});

// Initialize display
updateDisplay();