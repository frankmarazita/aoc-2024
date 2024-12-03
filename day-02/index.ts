const path = __dirname + '/input.txt';
const file = Bun.file(path);

const text = await file.text();

const lines = text.split('\n');

const reports: number[][] = [];

for (const line of lines) {
  const report = line.split(' ').map(Number);
  reports.push(report);
}

function isReportIncreasing(report: number[]): boolean {
  for (let i = 1; i < report.length; i++) {
    if (report[i] <= report[i - 1]) {
      return false;
    }
  }

  return true;
}

function isReportDecreasing(report: number[]): boolean {
  for (let i = 1; i < report.length; i++) {
    if (report[i] >= report[i - 1]) {
      return false;
    }
  }

  return true
}

function reportAdjacentNumberGreaterThanThree(report: number[]): boolean {

  // ensure that two adjacent numbers are not greater than 3

  for (let i = 1; i < report.length; i++) {
    if (Math.abs(report[i] - report[i - 1]) > 3) {
      return true;
    }
  }

  return false;
}

function checkReportSafety(report: number[]): boolean {
  let safe = true;

  if (!isReportIncreasing(report) && !isReportDecreasing(report)) {
    safe = false;
  } else if (reportAdjacentNumberGreaterThanThree(report)) {
    safe = false;
  }

  return safe;
}

let safe = 0

for (const report of reports) {
  if (checkReportSafety(report)) {
    safe++;
  }
}

console.log(safe);

// part 2

function removeALevelFromReport(report: number[], index: number): number[] {
  return report.filter((_, i) => i !== index);
}

safe = 0

for (const report of reports) {
  let couldBeSafe = false;
  
  for (let i = 0; i < report.length; i++) {
    const newReport = removeALevelFromReport(report, i);

    if (checkReportSafety(newReport)) {
      couldBeSafe = true;
      break;
    }
  }

  if (couldBeSafe) {
    safe++;
  }
}

console.log(safe);
