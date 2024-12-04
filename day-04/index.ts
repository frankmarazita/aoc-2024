const path = __dirname + "/input.txt";
const file = Bun.file(path);

const text = await file.text();

const linesStr = text.split("\n");

type Page = string[][];
type Position = [number, number]; // [x, y]
type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

const directions: Direction[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const page: Page = linesStr.map((line) => line.split(""));

function getCharAtPosition(page: Page, position: Position): string | null {
  let x = position[0];
  let y = position[1];

  const line = page[y];
  if (!line) return null;

  const char = line[x];
  if (!char) return null;

  return char;
}

function getNextPositionWithDirection(
  position: Position,
  direction: Direction
): Position {
  let x = position[0];
  let y = position[1];

  if (direction.includes("N")) y -= 1;
  if (direction.includes("E")) x += 1;
  if (direction.includes("S")) y += 1;
  if (direction.includes("W")) x -= 1;

  return [x, y] as Position;
}

function countWordAtPosition(page: Page, word: string, position: Position) {
  let count = 0;

  for (const d of directions) {
    let pos = [...position] as Position;
    let foundIssue = false;

    for (const c of word) {
      const char = getCharAtPosition(page, pos);

      if (!char || c !== char) {
        foundIssue = true;
        break;
      } else {
        pos = getNextPositionWithDirection(pos, d);
      }
    }

    if (foundIssue) continue;
    else count++;
  }

  return count;
}

const word = "XMAS";

let count = 0;

for (let i = 0; i < page.length; i++) {
  const line = page[i];
  for (let j = 0; j < line.length; j++) {
    count += countWordAtPosition(page, word, [j, i]);
  }
}

console.log(count);
