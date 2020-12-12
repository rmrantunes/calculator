export class Calculator {
    constructor(input, numbers, operators, result, clear, hardClear) {
        this.input = input;
        this.numbers = numbers;
        this.operators = operators;
        this.result = result;
        this.clear = clear;
        this.hardClear = hardClear;
        this.memory = [];
        this.operations = [
            ["+", "plus"],
            ["-", "minus"],
            ["*", "times"],
            ["/", "obelus"],
        ];
        this.displayNumbers = this.displayNumbers.bind(this);
        this.pushOperationToMemory = this.pushOperationToMemory.bind(this);
        this.showResult = this.showResult.bind(this);
        this.clearDisplay = this.clearDisplay.bind(this);
        this.clearMemory = this.clearMemory.bind(this);
        this.keyboardActions = this.keyboardActions.bind(this);
    }
    displayNumbers({ currentTarget }) {
        this.input.value += currentTarget.value;
    }
    displayNumbersKeyboard(typedKey) {
        this.input.value += typedKey;
    }
    backSpace() {
        this.input.value = this.input.value.slice(0, -1);
    }
    clearDisplay() {
        this.input.value = "";
    }
    clearMemory() {
        this.clearDisplay();
        this.memory = [];
    }
    pushOperationToMemory({ currentTarget }) {
        this.memory.push({
            value: Number(this.input.value),
            type: currentTarget.value,
        });
        this.clearDisplay();
    }
    pushToMemoryKeyboard(operationType) {
        this.memory.push({ value: Number(this.input.value), type: operationType });
        this.clearDisplay();
    }
    showResult() {
        this.memory.push({
            type: "last",
            value: Number(this.input.value),
        });
        const result = this.memory.reduce((previous, current) => {
            switch (previous.type) {
                case "plus":
                    return {
                        value: previous.value + current.value,
                        type: current.type,
                    };
                case "minus":
                    return {
                        value: previous.value - current.value,
                        type: current.type,
                    };
                case "times":
                    return {
                        value: previous.value * current.value,
                        type: current.type,
                    };
                case "obelus":
                    return {
                        value: previous.value / current.value,
                        type: current.type,
                    };
                default:
                    return { type: "error", value: current.value };
            }
        });
        this.input.value = String(result.value);
        this.memory = [];
    }
    keyboardActions(event) {
        const { key } = event;
        const typedKey = Number(key);
        const isNumber = !isNaN(typedKey);
        if (isNumber || key === ".") {
            this.displayNumbersKeyboard(key);
        }
        if (key === "Backspace") {
            this.backSpace();
        }
        if (key === "Enter") {
            this.showResult();
        }
        this.operations.forEach((operation) => {
            if (operation[0] === key) {
                this.pushToMemoryKeyboard(operation[1]);
            }
        });
    }
    init() {
        this.numbers.forEach((number) => {
            number.addEventListener("click", this.displayNumbers);
        });
        this.operators.forEach((operator) => {
            operator.addEventListener("click", this.pushOperationToMemory);
        });
        this.result.addEventListener("click", this.showResult);
        this.clear.addEventListener("click", this.clearDisplay);
        this.hardClear.addEventListener("click", this.clearMemory);
        window.addEventListener("keyup", this.keyboardActions);
    }
}
// Warning: usage below
