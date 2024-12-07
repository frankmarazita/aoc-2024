const path = __dirname + "/input.txt";
const file = Bun.file(path);

const text = await file.text();

const lines = text.split("\n");

type Equation = {
  testValue: number;
  numbers: number[];
};

const equations: Equation[] = [];

for (const line of lines) {
  const [testValueString, numberString] = line.split(": ");

  const testValue = Number(testValueString);
  const numbers = numberString.split(" ").map(Number);

  equations.push({ testValue, numbers });
}

type Operators = "+" | "*";
const operators: Operators[] = ["+", "*"];

function couldEquationBeTrue(equation: Equation) {
  let operationPermutations: Operators[][] = [];

  function generatePermutations(operators: Operators[], numbers: number[]) {
    if (operators.length === numbers.length - 1) {
      operationPermutations.push(operators);
      return;
    }

    for (const op of ["+", "*"] as Operators[]) {
      generatePermutations([...operators, op], numbers);
    }
  }

  generatePermutations([], equation.numbers);

  function calculate(numbers: number[], ops: string[]) {
    let result = numbers[0];

    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === "+") {
        result += numbers[i + 1];
      } else {
        result *= numbers[i + 1];
      }
    }

    return result;
  }

  let isTrue = false;

  for (const ops of operationPermutations) {
    if (calculate(equation.numbers, ops) === equation.testValue) {
      isTrue = true;
      break;
    }
  }

  return isTrue;
}

const trueEquations = equations.filter((equation) => {
  return couldEquationBeTrue(equation);
});

let trueTestValueTotal = 0;

for (const equation of trueEquations) {
  trueTestValueTotal += equation.testValue;
}

console.log(trueTestValueTotal);
