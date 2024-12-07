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

type Operators = "+" | "*" | "||";

function couldEquationBeTrue(equation: Equation, operatorSet: Operators[]) {
  let operationPermutations: Operators[][] = [];

  function generatePermutations(operators: Operators[], numbers: number[]) {
    if (operators.length === numbers.length - 1) {
      operationPermutations.push(operators);
      return;
    }

    for (const op of operatorSet) {
      generatePermutations([...operators, op], numbers);
    }
  }

  generatePermutations([], equation.numbers);

  function calculate(numbers: number[], ops: string[]) {
    let resultString = numbers[0].toString();

    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === "+") {
        resultString = String(Number(resultString) + numbers[i + 1]);
      } else if (ops[i] === "*") {
        resultString = String(Number(resultString) * numbers[i + 1]);
      } else {
        resultString += numbers[i + 1];
      }
    }

    return Number(resultString);
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
  return couldEquationBeTrue(equation, ["+", "*"]);
});

let trueTestValueTotal = 0;

for (const equation of trueEquations) {
  trueTestValueTotal += equation.testValue;
}

console.log(trueTestValueTotal);

// part 2

const trueEquations2 = equations.filter((equation) => {
  return couldEquationBeTrue(equation, ["+", "*", "||"]);
});

let trueTestValueTotal2 = 0;

for (const equation of trueEquations2) {
  trueTestValueTotal2 += equation.testValue;
}

console.log(trueTestValueTotal2);
