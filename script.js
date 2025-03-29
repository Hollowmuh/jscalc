let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let calculationJustMade = false;

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

// Initialize display
updateDisplay();