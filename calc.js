const calc = {
  form: document.querySelector('[data-calc="calc"]'),
  input: document.querySelector('[data-calc="input"]'),
  nums: document.querySelectorAll('[data-calc="num"]'),
  operators: Array.from(document.querySelectorAll('[data-calc="operator"]')),
  result: document.querySelector('[data-calc="result"]'),
  clear: document.querySelector('[data-calc="clear"]'),
  hardClear: document.querySelector('[data-calc="hard-clear"]'),
};
let allHistory = [];
let memory = [];

// colocar o valor do botão no input
const putIntoInput = ({ target }) => {
  calc.input.value += target.value;
};
calc.nums.forEach((num) => {
  num.addEventListener("click", putIntoInput);
});

// Colocar o valor pelo teclado sem estar focado
const putIntoInputKeyboard = (key) => {
  calc.input.value += key;
};

// limpar imput
const clearInput = (hard = false) => {
  calc.input.value = "";
  hard && (memory = []);
};
// backspace
const backSpace = () => {
  const value = Array.from(calc.input.value);
  value.pop();
  const newValue = value.join("");
  calc.input.value = newValue;
};
// clear events
calc.clear.addEventListener("click", () => {
  backSpace();
});
calc.clear.addEventListener("dblclick", () => {
  clearInput();
});
calc.hardClear.addEventListener("click", () => {
  clearInput(true);
  calc.input.setAttribute("placeholder", "0");
});

// selecionar o numero e o tipo de operador e colocar no histórico
const operation = ({ target }, keyType) => {
  memory.push({
    num: +calc.input.value,
    type: target ? target.value : keyType,
  });
  calc.input.setAttribute("placeholder", +calc.input.value);
  calc.input.value = "";
};
// select operator and number events
calc.operators.forEach((operator) => {
  operator.addEventListener("click", operation);
});

// mostrar resultado
const showResult = () => {
  memory.push({
    num: +calc.input.value,
    type: "last",
  });
  const result = memory.reduce((returned, current) => {
    // na primeira iteração, ele pega o valor do primeiro e já opera com o segundo
    // na segunda iteração, o type não é do teceiro valor, mas do segundo.
    // por isso o (type: current.type)

    if (returned.type === "sum")
      return { num: returned.num + current.num, type: current.type };
    else if (returned.type === "minus")
      return { num: returned.num - current.num, type: current.type };
    else if (returned.type === "divide")
      return { num: returned.num / current.num, type: current.type };
    else if (returned.type === "mult")
      return { num: returned.num * current.num, type: current.type };
  });
  calc.input.value = result.num;
  allHistory.push(memory);
  memory = [];
};

calc.result.addEventListener("click", showResult);

// complementar: executar a funcão operation e show result pelo teclado
// fase de produção e testes
window.addEventListener("keyup", ({ key }) => {
  key === "Enter" && showResult();
  key === "Backspace" && backSpace();
  "1 2 3 4 5 6 7 8 9 0 .".includes(key) && putIntoInputKeyboard(key);
  const keyType = calc.operators
    .filter((operator) => operator.innerText === key)
    .map((item) => item.value);
  "sum mult divide minus".includes(keyType[0]) && operation({}, keyType[0]);
});

// complementar: continuar a operação mesmo depois de ter apertado "="
//  já resolvido
