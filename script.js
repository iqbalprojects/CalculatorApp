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
    if (calculationOperator === "" && !prevNumber) {
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

const clearNumber = () => {
    currentNumber = "0";
    calculatorScreen.value = "0";
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
        }
        inputNumber(event.target.value);
        updateScreen(event.target.value);

        if (currentNumber > 0) {
            clearBtn.innerHTML = "C";
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        if (prevNumber) {
            calculate();
            if (currentNumber !== "0") {
                calculatorScreen.value = "0";
                updateScreen(currentNumber);
            }
        } else if (currentNumber.includes(".") && currentNumber === "0.") {
            calculatorScreen.value = currentNumber;
            return;
        }
        inputOperator(event.target.value);
    });
});

percentage.addEventListener("click", () => {
    if (prevNumber && currentNumber !== "0") {
        currentNumber = `${(currentNumber / 100) * prevNumber}`;
    } else {
        if (prevNumber) {
            currentNumber = `${prevNumber / 100}`;
            prevNumber = currentNumber;
        } else {
            currentNumber = `${currentNumber / 100}`;
        }
    }
    calculatorScreen.value = "0";
    updateScreen(currentNumber);
});

equalSign.addEventListener("click", () => {
    calculate();
    calculatorScreen.value = "0";
    updateScreen(currentNumber);
    prevNumber = currentNumber;
    currentNumber = "0";
});

clearBtn.addEventListener("click", () => {
    if (clearBtn.textContent === "C") {
        clearNumber();
    } else {
        clearAll();
    }
    clearBtn.innerHTML = "AC";
    updateScreen(currentNumber);
});

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value);
});
