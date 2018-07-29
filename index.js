/**
 * Conway 2
 */

const program = require('commander');
const Grid = require('./src/grid');
const Cmd = require('./src/cmd');
const Game = require('./src/game');

program.version('1.0.0')
  .description('Conway - Game of Life')
  .option('-o, --output [mode]', 'The output [mode]', 'flat');

program.command('play <width> <height> <infect-after> <max-generations> <seed>')
  .alias('p')
  .description('Play a game')
  .action((width, height, infectAfter, maxGenerations, seed) => {
    const grid = Grid.fromString(seed, width, height);
    const output = new Cmd(width, height, program.output);
    const game = new Game(grid, output, maxGenerations, infectAfter);
    game.play();
  });

if (!process.argv.slice(2).length || !/^p/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv);
