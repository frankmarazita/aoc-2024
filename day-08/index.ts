const path = __dirname + "/input.txt";
const file = Bun.file(path);

const text = await file.text();

const lines = text.split("\n");

type Position = [number, number]; // [x, y]

const data: Map<string, Position[]> = new Map();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const [j, char] of line.split("").entries()) {
    if (char !== ".") {
      if (!data.has(char)) {
        data.set(char, [[j, i]]);
      } else {
        data.get(char)?.push([j, i]);
      }
    }
  }
}

const mapHeight = lines.length;
const mapWidth = lines[0].length;

function isPositionValid(position: Position): boolean {
  const [x, y] = position;
  return x >= 0 && x < mapWidth && y >= 0 && y < mapHeight;
}

function getNextRelativePosition(
  positionA: Position,
  positionB: Position
): Position {
  const [xA, yA] = positionA; // 0, 0
  const [xB, yB] = positionB; // 1, 1

  const xDiff = xA - xB; // -1
  const yDiff = yA - yB; // -1

  const xC = xB - xDiff; // 2
  const yC = yB - yDiff; // 2

  return [xC, yC]; // 2, 2
}

const antinodes: Set<string> = new Set();

function printAntinodes(antinodes: Set<string>) {
  for (let i = 0; i < mapHeight; i++) {
    let line = "";
    for (let j = 0; j < mapWidth; j++) {
      if (antinodes.has(`${j},${i}`)) {
        line += "#";
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
}

for (const [, positions] of data) {
  for (const position of positions) {
    for (const targetPosition of positions) {
      if (position !== targetPosition) {
        const antinodePosition = getNextRelativePosition(
          position,
          targetPosition
        );
        if (isPositionValid(antinodePosition)) {
          antinodes.add(`${antinodePosition[0]},${antinodePosition[1]}`);
        }
      }
    }
  }
}

console.log(antinodes.size);

// printAntinodes(antinodes);

// part 2

antinodes.clear();

for (const [, positions] of data) {
  for (const position of positions) {
    for (const targetPosition of positions) {
      if (position !== targetPosition) {
        antinodes.add(`${targetPosition[0]},${targetPosition[1]}`);

        let valid = true;

        let positionA = position;
        let positionB = targetPosition;

        while (valid) {
          let antinodePosition = getNextRelativePosition(positionA, positionB);

          if (isPositionValid(antinodePosition)) {
            antinodes.add(`${antinodePosition[0]},${antinodePosition[1]}`);
            positionA = positionB;
            positionB = antinodePosition;
          } else {
            valid = false;
          }
        }
      }
    }
  }
}

console.log(antinodes.size);

// printAntinodes(antinodes);
