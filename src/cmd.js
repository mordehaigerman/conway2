/**
 * Conway 2
 */

const Output = require('./output');

module.exports = class Cmd extends Output {
  /**
   * @param {number} width  The width of the output grid
   * @param {number} height The height of the output grid
   * @param {string} mode   The mode of the output (flat or 2d)
   */
  constructor(width, height, mode = 'flat') {
    super(width, height);
    this.mode = mode;
    this.stdout = process.stdout;
  }

  /**
   * Used for mocking in unit testing to change the output mode.
   *
   * @param {string} mode   The mode of the output (flat or 2d)
   * @returns {this}
   */
  setMode(mode = 'flat') {
    this.mode = mode;
    return this;
  }

  /**
   * Used for mocking in unit testing to change the output writer.
   *
   * @param {object} An object that handles writing to stdout.
   * @returns {this}
   */
  setStdout(stdout) {
    if (!('write' in stdout)) {
      throw new Error('Invalid stdout object provided. Must include write.');
    }
    this.stdout = stdout;
    return this;
  }

  /**
   * Writes to stdout output
   *
   * @returns {this}
   */
  out() {
    let eol = ' ';
    let end = '\n';
    let str = '';

    if (this.mode === '2d') {
      if ('moveCursor' in this.stdout) {
        this.stdout.moveCursor(0, -this.grid.length);
      }
      eol = '\n';
      end = '';
    }

    this.grid.forEach((row) => {
      str += `${row.join(' ')}${eol}`;
    });

    this.stdout.write(`${str}${end}`);

    return this;
  }
};
