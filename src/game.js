/**
 * Conway 2
 */

const has = Object.prototype.hasOwnProperty;
const Cell = require('./cell');
const Grid = require('./grid');
const Output = require('./output');

module.exports = class Game {
  /**
   * @param {Grid}   grid           An initial grid to start the game with.
   * @param {Output} output         An Output instance which outputs the game.
   * @param {number} maxGenerations Max generations to play, 0 means infinite.
   * @param {number} infectAfter    Infect after n generations, 0 means never.
   */
  constructor(grid, output, maxGenerations = 0, infectAfter = 0) {
    if (!(grid instanceof Grid) || !(output instanceof Output)) {
      throw new Error('Invalid grid/output provided.');
    }
    this.output = output;
    this.generation = 1;
    this.maxGenerations = parseInt(+maxGenerations, 10);
    this.infectAfter = parseInt(+infectAfter, 10);

    this.setGrid(grid)
      .padGrid();
  }

  /**
   * Overrides the current grid object with a new one.
   *
   * @param {Grid} grid A grid object to continue to the next generation with.
   * @returns {this} Enables chaining.
   */
  setGrid(grid) {
    if (!(grid instanceof Grid)) {
      throw new Error('Invalid grid/output provided.');
    }
    this.grid = grid;
    return this;
  }

  /**
   * @returns {Grid} The current grid object.
   */
  getGrid() {
    return this.grid;
  }

  /**
   * @returns {boolean} Whether or not an infection has started.
   */
  hasInfected() {
    if (this.infectAfter === 0) {
      return false;
    }
    return this.infectAfter <= this.generation;
  }

  /**
   * Executes the current state of the grid and outputs it.
   *
   * @returns {this} Enables chaining.
   */
  current() {
    const grid = new Grid();
    Object.values(this.grid.getAll()).forEach((cell) => {
      if (this.output.set(cell.x, cell.y, cell.active) !== false) {
        grid.add(cell);
      }
    });
    this.output.out();
    return this.setGrid(grid);
  }

  /**
   * Prepares cells that may live in the next generations.
   *
   * In case of no infection:
   * - A cell must be surrounded by at least 2 live neighbors.
   * Otherwise, after infection:
   * - A cell must be surrounded by at least 1 live neighbor.
   *
   * @returns {this} Enables chaining.
   */
  padGrid() {
    const grid = new Grid();
    const hasOtherNeighbour = {};
    Object.values(this.grid.getAll()).forEach((cell) => {
      grid.add(cell);
      if (cell.active) {
        const neighbors = cell.getNeighbors();
        Object.values(neighbors).forEach((neighbor) => {
          if (this.output.isInsideGrid(neighbor.x, neighbor.y)) {
            if (!grid.has(neighbor.id)) {
              if (!this.hasInfected() && !has.call(hasOtherNeighbour, neighbor.id)) {
                hasOtherNeighbour[neighbor.id] = true;
              } else {
                grid.add(neighbor);
              }
            }
          }
        });
      }
    });
    return this.setGrid(grid);
  }

  /**
   * Prepares the next state of the grid to be outputted in the next generation.
   *
   * @returns {this} Enables chaining.
   */
  next() {
    const grid = new Grid();
    Object.values(this.grid.getAll()).forEach((cell) => {
      if (this.shouldBeInNextGeneration(cell)) {
        grid.add(new Cell(cell.x, cell.y, true));
      }
    });
    this.generation += 1;
    return this.setGrid(grid)
      .padGrid();
  }

  /**
   * Checks whether or not a given cell should live in the next generation.
   *
   * In case of no infection:
   * - A live cell must be surrounded by any 2 live neighbors to live.
   * - A dead cell must be surrounded by any 3 live neighbors to become alive.
   * Otherwise, after infection:
   * - A live cell must be surrounded by either a horizontal or a vertical
   *   neighbor cell to live.
   * - A dead cell must be surrounded by any single live neighbor to become
   *   alive.
   *
   * @returns {boolean} Returns true or false.
   */
  shouldBeInNextGeneration(cell) {
    if (!(cell instanceof Cell)) {
      throw new Error('Invalid cell provided.');
    }
    const count = this.grid.countActiveNeighbors(cell);
    const wasActive = cell.active;
    let active = false;
    if (this.hasInfected()) {
      if (wasActive) {
        active = this.grid.countActiveNeighbors(cell, true) > 0;
      } else {
        active = count === 1;
      }
    } else if (count) {
      active = (count === 2 && wasActive) || count === 3;
    }
    return active;
  }

  /**
   * Starts the game, plays generation after generation until it stopps.
   *
   * @return {this} Enables chaining.
   */
  play() {
    const current = this.current().getGrid().asString();
    const next = this.next().getGrid().asString();
    if (this.maxGenerations === 0 || this.maxGenerations >= this.generation) {
      this.output.run(() => this.play(), current !== next);
    }
    return this;
  }
};
