import { Calculator } from "./Calculator.js";
const $ = document.querySelector.bind(document);
const $_All = document.querySelectorAll.bind(document);
const input = $('[data-calc="input"]');
const numbers = [...$_All('[data-calc="num"]')];
const operators = [...$_All('[data-calc="operator"]')];
const result = $('[data-calc="result"]');
const clear = $('[data-calc="clear"]');
const hardClear = $('[data-calc="hard-clear"]');
const calc = new Calculator(input, numbers, operators, result, clear, hardClear);
calc.init();
