const path = __dirname + "/input.txt";
const file = Bun.file(path);

const text = await file.text();

const lines = text.split("\n");

const map: string[][] = lines.map((line) => line.split(""));

function findChar(map: string[][], char: string): [number, number] | null {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];

    for (let x = 0; x < row.length; x++) {
      if (row[x] === char) {
        return [x, y];
      }
    }
  }

  return null;
}

let direction: 'N' | 'E' | 'S' | 'W' = 'N';

let location = findChar(map, "^"); // [x, y]
if (!location) throw new Error("No start point found");

// replace the start point with a '.'
map[location[1]][location[0]] = ".";

const mapVisited = map.map((row) => [...row]);

function moveForward(location: [number, number], direction: 'N' | 'E' | 'S' | 'W'): [number, number] {
  let [x, y] = location;

  switch (direction) {
    case 'N':
      y--;
      break;
    case 'E':
      x++;
      break;
    case 'S':
      y++;
      break;
    case 'W':
      x--;
      break;
  }

  return [x, y];
}

function isOutOfBounds(location: [number, number]): boolean {
  const [x, y] = location;

  return x < 0 || x >= map[0].length || y < 0 || y >= map.length;
}

function getPoint(map: string[][], location: [number, number]): string | null {
  const [x, y] = location;

  if (isOutOfBounds(location)) return null;

  return map[y][x];
}

function rotateRight(direction: 'N' | 'E' | 'S' | 'W'): 'N' | 'E' | 'S' | 'W' {
  switch (direction) {
    case 'N':
      return 'E';
    case 'E':
      return 'S';
    case 'S':
      return 'W';
    case 'W':
      return 'N';
  }
}

function markVisited(location: [number, number]) {
  const [x, y] = location;

  mapVisited[y][x] = "X";
}

function writeMap(map: string[][], path: string) {
  const visitedPath = __dirname + `/${path}`;

  const visitedText = mapVisited.map((row) => row.join("")).join("\n");

  Bun.write(visitedPath, visitedText);
}

const visited = new Set<string>();
visited.add(location.join(","));

while (true) {
  const next = moveForward(location, direction);
  const point = getPoint(map, next);

  if (point === "#") {
    direction = rotateRight(direction);
    continue;
  }

  if (point === null) {
    break;
  }

  location = next;
  markVisited(location);
  visited.add(location.join(","));
}

console.log(visited.size);

// writeMap(mapVisited, "visited.txt");
