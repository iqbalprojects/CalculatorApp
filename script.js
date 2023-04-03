const calculatorScreen = document.querySelector(".calculator-screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const percentage = document.querySelector(".percentage");
const equalSign = document.querySelector(".equal-sign");
const clearBtn = document.querySelector(".all-clear");
const decimal = document.querySelector(".decimal");

let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";

const updateScreen = (number) => {
    if (calculatorScreen.value === "0") {
        calculatorScreen.value = number;
    } else if (number.includes(".")) {
        calculatorScreen.value += ".";
    } else {
        calculatorScreen.value += number;
    }
};

const inputNumber = (number) => {
    if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
};

const inputOperator = (operator) => {
    if (calculationOperator === "") {
        prevNumber = currentNumber;
    }
    calculationOperator = operator;
    currentNumber = "0";
};

const calculate = () => {
    let result = "";
    switch (calculationOperator) {
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            break;
        case "-":
            result = prevNumber - currentNumber;
            break;
        case "*":
            result = prevNumber * currentNumber;
            break;
        case "/":
            result = prevNumber / currentNumber;
            break;
        default:
            return;
    }

    currentNumber = result;
    prevNumber = result;
    calculationOperator = "";
};

const clearAll = () => {
    prevNumber = "";
    calculationOperator = "";
    currentNumber = "0";
    calculatorScreen.value = "0";
};

const inputDecimal = (dot) => {
    if (currentNumber.includes(".")) {
        return;
    } else {
        currentNumber += dot;
    }
    updateScreen(currentNumber);
};

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        if (prevNumber && currentNumber === "0") {
            calculatorScreen.value = "0";
            inputNumber(event.target.value);
            updateScreen(event.target.value);
        } else {
            inputNumber(event.target.value);
            updateScreen(event.target.value);
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        if (prevNumber && currentNumber !== "0") {
            calculate();
            calculatorScreen.value = "0";
            updateScreen(currentNumber);
        } else if (currentNumber.includes(".") && currentNumber === "0.") {
            calculatorScreen.value = currentNumber;
            return;
        }
        inputOperator(event.target.value);
    });
});

percentage.addEventListener("click", () => {
    if (prevNumber.length > 1) {
        currentNumber = `${
            prevNumber.substring(0, prevNumber.length - 1) *
            currentNumber.substring(0, currentNumber.length - 1)
        }`;
    } else if (prevNumber.length === 1) {
        currentNumber = `${prevNumber * Array.from(currentNumber)[0]}`;
    } else {
        currentNumber = `${calculatorScreen.value / 100}`;
    }
    calculatorScreen.value = "0";
    updateScreen(currentNumber);
});

equalSign.addEventListener("click", () => {
    if (currentNumber == 0) {
        return;
    } else {
        calculate();
        calculatorScreen.value = "0";
        updateScreen(currentNumber);
    }
});

clearBtn.addEventListener("click", () => {
    clearAll();
    updateScreen(currentNumber);
});

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value);
});
