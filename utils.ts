import chalk, { ChalkInstance } from 'chalk';

export const getArg = (cliArg: string) =>
  process.argv.find((arg) => arg.startsWith(`${cliArg}=`))?.split('=')[1];

export const isWithinRange = (
  mainNum: number,
  rangeNum: number,
  comparisonNum: number
) => {
  return (
    comparisonNum >= mainNum - rangeNum && comparisonNum <= mainNum + rangeNum
  );
};

export const randInt = (value1: number, value2: number): number => {
  const min = Math.min(value1, value2);
  const max = Math.max(value1, value2);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randElement = <T>(array: T[]): T => {
  const randomIndex = randInt(0, array.length - 1);
  return array[randomIndex];
};

export const getTreeColoredText = (str: string) => {
  return randElement([
    ...Array.from<ChalkInstance>({ length: 30 }).fill(chalk.green),
    ...Array.from<ChalkInstance>({ length: 30 }).fill(chalk.green.bold),
    ...Array.from<ChalkInstance>({ length: 4 }).fill(chalk.red),
    ...Array.from<ChalkInstance>({ length: 2 }).fill(chalk.white.bgRed),
    ...Array.from<ChalkInstance>({ length: 4 }).fill(chalk.yellow),
    ...Array.from<ChalkInstance>({ length: 2 }).fill(chalk.bgYellow.red.bold),
    chalk.blue,
    chalk.white.bgGreen.bold,
    chalk.cyan,
    chalk.bgCyan.bold,
    chalk.bgMagenta.bold
  ])(str);
};

export const getTreeChar = () => {
  return getTreeColoredText(
    randElement([
      // Increase chances of the random character being a `*`
      ...Array.from<string>({ length: 25 }).fill('*'),
      'O',
      'o',
      'l',
      '[',
      'u',
      '%',
      '#',
      '^',
      '@'
    ])
  );
};

export const getTrunkColoredText = (str: string) => {
  return randElement([
    chalk.red,
    chalk.red.bold,
    chalk.magenta,
    chalk.magenta.bold,
    chalk.yellow
  ])(str);
};

export const getTrunkChar = () => {
  return getTrunkColoredText(
    randElement([
      // Increase chances of the random character being a `*`
      ...Array.from<string>({ length: 35 }).fill('*'),
      ...Array.from<string>({ length: 10 }).fill('#'),
      ...Array.from<string>({ length: 3 }).fill('|')
    ])
  );
};
