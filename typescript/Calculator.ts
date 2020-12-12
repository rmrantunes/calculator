interface IOperation {
  value: number;
  type: string;
}

export class Calculator {
  memory: IOperation[];
  operations: string[][];

  constructor(
    private input: HTMLInputElement,
    private numbers: HTMLButtonElement[],
    private operators: HTMLButtonElement[],
    private result: HTMLButtonElement,
    private clear: HTMLButtonElement,
    private hardClear: HTMLButtonElement,
  ) {
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

  displayNumbers({ currentTarget }: Event) {
    this.input.value += (currentTarget as HTMLButtonElement).value;
  }

  displayNumbersKeyboard(typedKey: string) {
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

  pushOperationToMemory({ currentTarget }: Event) {
    this.memory.push({
      value: Number(this.input.value),
      type: (currentTarget as HTMLButtonElement).value,
    });
    this.clearDisplay();
  }

  pushToMemoryKeyboard(operationType: string) {
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

  private keyboardActions(event: KeyboardEvent) {
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
