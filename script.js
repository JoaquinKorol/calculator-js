const buttons = document.querySelectorAll("button");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const equal = document.querySelector(".equal")
const screen = document.querySelector(".screen");
const deleteNum = document.querySelector("#delete")
const clear = document.querySelector("#clear")
const decimal = document.querySelector(".decimal")

let num1 = "";
let num2 = "";
let operator = "";
let result;
const oper = ["+", "-", "/", "x"]

function add(a, b) {
    return a + b;
} 

function subtract(a, b){
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}



function operate(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case "+":
            result = add(num1, num2)
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "/":
            if (num2 == 0) {
                alert("Error: Division by zero");
                return;
            }
            result = divide(num1, num2)
            break;
    }

    const decimalLength = getDecimalLength(result);

    if (result % 1 !== 0 && decimalLength > 3) {
        result = result.toFixed(3)
    }
}

function updateScreen() {
    screen.textContent = `${num1} ${operator} ${num2}`
}

function clearCalculator(){
    num1 = "";
    operator = "";
    num2 = "";
    result = "";
    updateScreen()
    screen.textContent = 0;
}

function getDecimalLength(number) {
    const decimalPart = (number.toString().split('.')[1] || '');
    return decimalPart.length;
}

numbers.forEach(number => {
    number.addEventListener("click", () =>{
        if (num1 === "0" && operator === "") {
            num1 = "";
        }
        
        if (operator == ""){
            num1 +=  number.value;
        } else {
            num2 +=  number.value;
        }
        
        updateScreen();
    })
})





decimal.addEventListener("click", () => {
    const currentNum = (operator === "") ? num1 : num2;

    if (currentNum === "") {
        (operator === "") ? (num1 += "0.") : (num2 += "0.")
    } else if (!currentNum.includes(".")) {
        ((operator === "") ? (num1 += ".") : (num2 += "."))
    }

    updateScreen();
});


operators.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", () =>{
        if (num1 !== "") {
            if (num2 !== "") {
                operate(num1, operator, num2);
                num1 = result;
                num2 = "";
            }
        operator = operatorBtn.value;
        updateScreen();
        operatorBtn.blur();
        };
    });
});

equal.addEventListener("click", () => {
    operate(num1, operator, num2);

    if (!isNaN(result)) {
        num1 = result;
        num2 = "";
    } 
    updateScreen();
    equal.blur();
});

deleteNum.addEventListener("click", () => {
    if (num1 !== "" || num1 !== 0) {
        if (num2 !== "") {
            num2 = num2.slice(0, -1);
        } else if (operator !== "") {
            operator = "";
        } else {
            num1 = num1.toString().slice(0, -1);
            if (num1 === "") {
                num1 = "";
            }
        }
    } else if (result !== "") {
        result = result.toString().slice(0, -1);
        if (result === "") {
            screen.textContent = "0";
        }
    } 

    updateScreen();
    deleteNum.blur();
});

clear.addEventListener("click", () => {
    clearCalculator();
    clear.blur();
})

document.body.addEventListener("keydown", (ev) =>{
    if(!isNaN(ev.key) || ev.key === ".") {
        if (operator === "") {
            num1 += ev.key;
        } else {
            num2 += ev.key;
        }
        updateScreen()
    } else if (oper.includes(ev.key)) {
        if (num1 !== "") {
            if (num2 !== "") {
                operate(num1, operator, num2);
                num1 = result;
                num2 = "";
            }
            operator = ev.key;
            updateScreen();
        }
    } else if(ev.key === "Enter" || ev.key === "=") {
        equal.click();
    } else if(ev.key === "Backspace") {
        deleteNum.click();
    } else if(ev.key === "Escape") {
        clear.click();
    }
})