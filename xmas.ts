const DEFAULT_TREE_WIDTH = 11;

const width = Number(process.argv.find(arg => arg.startsWith('width='))?.split('=')[1] || DEFAULT_TREE_WIDTH);