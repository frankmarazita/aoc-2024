const path = __dirname + '/input.txt';
const file = Bun.file(path);

const text = await file.text();

const lines = text.split('\n');

const leftList: number[] = [];
const rightList: number[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const left = Number(line.split('   ')[0]);
  const right = Number(line.split('   ')[1]);

  leftList.push(left);
  rightList.push(right);
}

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let totalDistance = 0;

for (let i = 0; i < leftList.length; i++) {
  totalDistance += Math.abs(leftList[i] - rightList[i]);
}

console.log(totalDistance);

// part 2

const rightMap = new Map<number, number>();

for (let i = 0; i < rightList.length; i++) {
  const right = rightList[i];

  rightMap.set(right, (rightMap.get(right) || 0) + 1);
}

let totalSimilarity = 0;

for (let i = 0; i < leftList.length; i++) {
  const left = leftList[i];

  const right = rightMap.get(left) || 0;

  totalSimilarity += left * right;
}

console.log(totalSimilarity);
