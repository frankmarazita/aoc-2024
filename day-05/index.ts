const path = __dirname + '/input.txt';
const file = Bun.file(path);

const text = await file.text();

const lines = text.split('\n');

const updates: number[][] = [];

const before: Map<number, number[]> = new Map();
const after: Map<number, number[]> = new Map();

for (const line of lines) {
  if (line.includes('|')) {
    const [b, a] = line.split('|');

    if (!before.has(Number(b))) {
      before.set(Number(b), [Number(a)]);
    } else {
      const values = before.get(Number(b));
      before.set(Number(b), [...(values || []), Number(a)]);
    }

    if (!after.has(Number(a))) {
      after.set(Number(a), [Number(b)]);
    } else {
      const values = after.get(Number(a));
      after.set(Number(a), [...(values || []), Number(b)]);
    }
  }

  if (line.includes(',')) {
    const numbers = line.split(',').map(Number);
    updates.push(numbers);
  }
}

function getMiddleValueOfUpdate(update: number[]): number {
  const length = update.length;
  const middle = Math.floor(length / 2);
  return update[middle];
}

let total = 0;

for (const update of updates) {
  const middle = getMiddleValueOfUpdate(update);

  let valid = true;

  for (let i = 0; i < update.length; i++) {
    const value = update[i];

    if (i > 0) {
      const previousValues = update.slice(0, i);

      // Check if all previous values are in the before map
      const allPreviousValuesInBefore = previousValues.every((v) => after.get(value)?.includes(v));

      if (!allPreviousValuesInBefore) {
        valid = false;
        break;
      }
    }
  }

  if (valid) total += middle;
}

console.log(total);
