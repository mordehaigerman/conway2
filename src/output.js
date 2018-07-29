/**
 * Conway 2
 */

const Grid = require('./grid');

module.exports = class Output {
  /**
   * @param {number} width  The width of the output grid
   * @param {number} height The height of the output grid
   */
  constructor(width, height) {
    if (Number.isNaN(+width) || Number.isNaN(+height) || width < 1 || height < 1) {
      throw new Error('Invalid dimensions (width, height) provided.');
    }
    this.width = width;
    this.height = height;
    this.grid = Grid.createArray(width, height);
  }

  /**
   * Should be implemented in child classes.
   *
   * @returns {this} Enables method chaining.
   */
  out() {
    // nowhere to out
    return this;
  }

  /**
   * Checks if the coordinates of the cell are inside the ouput grid.
   *
   * @param {number} x The x coordinate of the cell to be output.
   * @param {number} y The y coordinate of the cell to be output.
   * @returns {boolean} Returns true in case it's valid or false.
   */
  isInsideGrid(x, y) {
    if (Number.isNaN(+x)
      || Number.isNaN(+y)
      || x < 0
      || y < 0
      || (this.width - x) <= 0
      || (this.height - y) <= 0
    ) {
      return false;
    }
    return true;
  }

  /**
   * Sets the state of the cell to be output at the specified position.
   *
   * @param {number}  x      The x coordinate of the cell to be output.
   * @param {number}  y      The y coordinate of the cell to be output.
   * @param {boolean} active The state of the cell, active means alive.
   * @returns {false|this} Returns false in case of invalid coordinates.
   */
  set(x, y, active = false) {
    if (!this.isInsideGrid(x, y)) {
      return false;
    }
    this.grid[y][x] = active === true ? 1 : 0;
    return this;
  }

  /**
   * Runs the next generation output with delay.
   *
   * @param {function} next       A callback that triggers the next generation.
   * @param {boolean}  hasChanged Whether or not the next generation's changed.
   * @returns {this} Enables method chaining.
   */
  run(next, hasChanged = false) {
    if (typeof next !== 'function') {
      throw new Error('A valid callback function must be passsed.');
    }
    if (hasChanged === true) {
      setTimeout(() => next(), 1000);
    }
    return this;
  }
};
