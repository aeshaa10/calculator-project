let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
let equalBtn = document.getElementById("equal");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        let value = button.getAttribute("data-value");

        if (value === "C") {
            clearDisplay();
        } else if (value === "DEL") {
            deleteLast();
        } else if (button.id === "equal") {
            calculate();
        } else {
            appendValue(value);
        }
    });
});

function appendValue(value) {

    let lastChar = display.value.slice(-1);
    let operators = ["+", "-", "*", "/"];

    // Prevent double operators
    if (operators.includes(lastChar) && operators.includes(value)) {
        return;
    }

    // Prevent multiple decimals
    if (value === ".") {
        let parts = display.value.split(/[\+\-\*\/]/);
        let lastNumber = parts[parts.length - 1];

        if (lastNumber.includes(".")) {
            return;
        }
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = new Function("return " + display.value)();
    } catch {
        display.value = "Error";
    }
}

// Keyboard Support
document.addEventListener("keydown", function(event) {

    let key = event.key;

    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        appendValue(key);
    }

    if (key === "Enter") {
        calculate();
    }

    if (key === "Backspace") {
        deleteLast();
    }

    if (key === "Escape") {
        clearDisplay();
    }
});
