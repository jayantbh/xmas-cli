import UpdateManager from 'stdout-update';
import strLen from 'string-length';

import { getArg, getTreeChar, isWithinRange, getTrunkChar } from './utils';
import chalk from 'chalk';

const DEFAULT_UPDATE_INTERVAL = 0;

const DEFAULT_TREE_WIDTH = 11;
const MAX_TREE_WIDTH = 81;

const DEFAULT_MIN_TRUNK_WIDTH = 3;
const TRUNK_WIDTH_MULTIPLIER = 3;
const TRUNK_WIDTH_SCALE_FREQUENCY = 20;

const showGreeting = getArg('showgreeting') === 'true';

const autoUpdateInterval = Number(
  getArg('autoupdate') || DEFAULT_UPDATE_INTERVAL
);
let width = Number(getArg('width') || DEFAULT_TREE_WIDTH);
const minTrunkWidth = Number(getArg('mintrunk') || DEFAULT_MIN_TRUNK_WIDTH);

if (width > MAX_TREE_WIDTH) {
  console.warn(
    `Maximum allowed width is 81 chars. Overriding supplied width to 81.\n\n`
  );
  width = 81;
}

const isEven = width % 2 === 0;

if (isEven) {
  console.warn(
    `Width needs to be an odd number. Setting it to ${width - 1}.\n\n`
  );
  width--;
}

const midPt = Math.floor(width / 2);

let allLines: string[] = [];

const printTree = () => {
  const height = Math.ceil(width / 2);

  for (let line = 0; line < height; line++) {
    const printLine = [];

    for (let col = 0; col < width; col++) {
      const canPrintStar = isWithinRange(midPt, line, col);

      if (canPrintStar) printLine.push(getTreeChar());
      else printLine.push(' ');
    }

    allLines.push(printLine.join(''));
  }
};

const printTrunk = () => {
  const scaledTrunkWidthWithoutMin =
    Math.floor(width / TRUNK_WIDTH_SCALE_FREQUENCY) * TRUNK_WIDTH_MULTIPLIER;
  const trunkWidth = minTrunkWidth + scaledTrunkWidthWithoutMin;

  const midTrunk = Math.floor(trunkWidth / 2);
  const height = Math.max(Math.floor(width / 5), 2);

  for (let line = 0; line < height; line++) {
    const printLine = [];

    for (let col = 0; col < width; col++) {
      const canPrintStar = isWithinRange(midPt, midTrunk, col);

      if (canPrintStar) printLine.push(getTrunkChar());
      else printLine.push(' ');
    }

    allLines.push(printLine.join(''));
  }
};

let timesGreetingPrinted = 0;
const printGreeting = () => {
  const brandColors = [chalk.magenta.bold, chalk.red.bold];
  const color = brandColors[timesGreetingPrinted % 2];
  timesGreetingPrinted++;

  if (!showGreeting) return;

  const lines = [
    '',
    chalk.green.bold('Merry Christmas 🎉'),
    'and a',
    chalk.yellow.bold('Happy New Year 🎊'),
    `from the ${color('Middleware')} team!`
  ];

  lines.forEach((line) => {
    const pad = Math.floor((width - strLen(line)) / 2);
    line = line.padStart(pad + line.length, ' ');
    line = line.padEnd(pad + line.length, ' ');
    allLines.push(line);
  });
};

let cliUpdater: UpdateManager | null = null;
if (autoUpdateInterval) {
  cliUpdater = UpdateManager.getInstance();
  cliUpdater.hook();
}

const printGraphic = async () => {
  printTree();
  printTrunk();
  printGreeting();

  if (cliUpdater) {
    cliUpdater.update(allLines);
    allLines = [];

    await new Promise((res) => setTimeout(res, autoUpdateInterval));
    printGraphic();
  } else console.log(allLines.join('\n'));
};

printGraphic();
