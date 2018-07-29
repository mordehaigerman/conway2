/**
 * Conway 2
 */

const has = Object.prototype.hasOwnProperty;
const Cell = require('./cell');

module.exports = class Grid {
  constructor() {
    this.cells = {};
  }

  /**
   * Adds a cell to the grid wether it's active or not.
   *
   * @param {Cell} cell A cell object.
   * @returns {this} Enables chaining.
   */
  add(cell) {
    if (!(cell instanceof Cell)) {
      throw new Error('An invalid cell is provided.');
    }
    this.cells[cell.id] = cell;
    return this;
  }

  /**
   * Returns a cell by a given identifier.
   *
   * @param {string} id A identifier of a cell.
   * @returns {Cell} A cell object.
   */
  get(id) {
    if (!this.has(id)) {
      throw new Error('An invalid identifier is provided.');
    }
    return this.cells[id];
  }

  /**
   * Checks whether or not a specific cell present in the grid.
   *
   * @param {string} id A identifier of a cell.
   * @returns {boolean} Returns true or false.
   */
  has(id) {
    return has.call(this.cells, id);
  }

  /**
   * Returns all the cells in the grid.
   *
   * @returns {Object.<string, Cell>} Object of id => cell object pairs.
   */
  getAll() {
    return this.cells;
  }

  /**
   * Returns the string representation of the current grid state.
   *
   * @returns {string} String of the grid state to easily compare to.
   */
  asString() {
    const cells = [];
    Object.keys(this.cells).sort().forEach((id) => {
      cells.push(`${id},${this.cells[id].active === true ? 1 : 0}`);
    });
    return JSON.stringify(cells);
  }

  /**
   * Counts active neighboring cells which surround a given cell.
   *
   * @param {Cell}    cell        A cell object.
   * @param {boolean} hasInfected Whether or nor an infection has started.
   * @returns {number} The total number of active neighbors.
   */
  countActiveNeighbors(cell, hasInfected = false) {
    if (!(cell instanceof Cell)) {
      throw new Error('An invalid cell is provided.');
    }
    let total = 0;
    cell.getNeighbors(hasInfected).forEach((neighbor) => {
      if (this.has(neighbor.id) && this.get(neighbor.id).active) {
        total += 1;
      }
    });
    return total;
  }

  /**
   * Creates an instance of the Grid class from an array.
   *
   * @param {Array} array An array of only ative cell coordinates (x and y).
   * @returns {Grid} A newly created Grid object.
   */
  static fromArray(array) {
    if (!Array.isArray(array)) {
      throw new Error('An array is provided.');
    }
    const grid = new Grid();
    array.forEach((xy) => {
      if (Array.isArray(xy) && xy.length > 1) {
        grid.add(new Cell(xy[0], xy[1], true));
      }
    });
    return grid;
  }

  /**
   * Creates an instance of the Grid class from a string.
   *
   * @param {string} string A space separated list of cells (0 or 1).
   * @param {number} width  The width of the grid (the length of a row.)
   * @param {number} height The height of the grid (the number of a rows.)
   * @returns {Grid} A newly created Grid object.
   */
  static fromString(string, width, height) {
    if (Number.isNaN(+width) || Number.isNaN(+height) || width < 1 || height < 1) {
      throw new Error('Invalid dimensions (width, height) provided.');
    }
    const cells = string.split(' ');
    const array = [];
    cells.forEach((active, i) => {
      if (parseInt(active, 10)) {
        const x = i % width;
        const y = Math.floor(i / width);
        if (!(width - x) || !(height - y)) {
          return;
        }
        array.push([x, y]);
      }
    });
    return this.fromArray(array);
  }

  /**
   * Creates a grid by a given width and height for the output writer.
   *
   * @param {number} width  The width of the grid (the length of a row.)
   * @param {number} height The height of the grid (the number of a rows.)
   * @returns {Array} An array of arrays which represends an empty grid.
   */
  static createArray(width, height) {
    if (Number.isNaN(+width) || Number.isNaN(+height) || width < 1 || height < 1) {
      throw new Error('Invalid dimensions (width, height) provided.');
    }
    const grid = [];
    const row = [];
    for (let i = 0; i < height; i += 1 /* eslint: no-plusplus */) {
      row.push(0);
    }
    for (let i = 0; i < width; i += 1 /* eslint: no-plusplus */) {
      grid.push([...row]);
    }
    return grid;
  }
};
