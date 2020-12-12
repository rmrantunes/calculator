import { Calculator } from "./Calculator.js";

const $ = document.querySelector.bind(document);
const $_All = document.querySelectorAll.bind(document);

const input = $('[data-calc="input"]') as HTMLInputElement;
const numbers = [...$_All('[data-calc="num"]')] as HTMLButtonElement[];
const operators = [...$_All('[data-calc="operator"]')] as HTMLButtonElement[];
const result = $('[data-calc="result"]') as HTMLButtonElement;
const clear = $('[data-calc="clear"]') as HTMLButtonElement;
const hardClear = $('[data-calc="hard-clear"]') as HTMLButtonElement;

const calc = new Calculator(
  input,
  numbers,
  operators,
  result,
  clear,
  hardClear,
);

calc.init();
