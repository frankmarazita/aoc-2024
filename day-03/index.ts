const path = __dirname + '/input.txt';
const file = Bun.file(path);

const text = await file.text();

const lines = text.split('\n');

const data = lines.join('');

function getMatchesFor(data: string, regex: RegExp): string[] {
  const muls: string[] = [];

  const matches = data.matchAll(regex);
  
  for (const match of matches) {
    muls.push(match[0]);
  }

  return muls;
}

function getMatchFor(data: string, regex: RegExp): string | null {
  const match = data.match(regex);

  return match ? match[0] : null;
}

function removeMatch(data: string, regex: RegExp): string {
  return data.replace(regex, '');
}

function calcMul(muls: string[]): number {
  let total = 0;

  for (let i = 0; i < muls.length; i++) {
    const nums = muls[i].match(/[0-9]+/g) as string[];

    total += parseInt(nums[0]) * parseInt(nums[1]);
  }

  return total;
}

const mulRegex = /mul\([0-9]+,[0-9]+\)/g;

const muls = getMatchesFor(data, mulRegex);

let total = calcMul(muls);

console.log(total);

// part 2

const functionMatches = /don't\(\)|do\(\)|mul\([0-9]+,[0-9]+\)/g;

const functions = getMatchesFor(data, functionMatches);

let shouldDo = true;

total = 0;

for (const func of functions) {
  if (func === "do()") {
    shouldDo = true;
  } else if (func === "don't()") {
    shouldDo = false;
  } else {
    if (shouldDo) {
      const nums = func.match(/[0-9]+/g) as string[];

      total += parseInt(nums[0]) * parseInt(nums[1]);
    }
  }
}

console.log(total);
