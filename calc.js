const calc = {
  form: document.querySelector('[data-calc="calc"]'),
  input: document.querySelector('[data-calc="input"]'),
  nums: document.querySelectorAll('[data-calc="num"]'),
  operators: document.querySelectorAll('[data-calc="operator"]'),
  result: document.querySelector('[data-calc="result"]'),
  clear: document.querySelector('[data-calc="clear"]'),
  hardClear: document.querySelector('[data-calc="hard-clear"]'),
};
let memory = [];

// colocar o valor do botão no input
const putIntoInput = ({ target }) => {
  calc.input.value += target.value;
};
calc.nums.forEach((num) => {
  num.addEventListener("click", putIntoInput);
});

// limpar imput
const clearInput = (hard = false) => {
  calc.input.value = "";
  hard && (memory = []);
};
calc.clear.addEventListener("click", () => {
  clearInput();
});
calc.hardClear.addEventListener("click", () => {
  clearInput(true);
});

// selecionar o numero e o tipo de operador e colocar no histórico
const operation = ({ target }) => {
  memory.push({
    num: +calc.input.value,
    type: target.value,
  });
  calc.input.setAttribute("placeholder", +calc.input.value);
  calc.input.value = "";
};

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
};

calc.result.addEventListener("click", showResult);

// complementar: executar a funcão operation e show result pelo teclado
window.addEventListener("keyup", ({ key, preventDefault }) => {
  if (key === "Enter") {
    showResult();
  }
});

// complementar: continuar a operação mesmo depois de ter apertado "="
