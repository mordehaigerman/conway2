/**
 * Conway 2
 */

module.exports = class Cell {
  /**
   * @param {number}  x      - The X coordinate of the cell
   * @param {number}  y      - The Y coordinate of the cell
   * @param {boolean} active - Whether or not the cell is alive
   */
  constructor(x, y, active = false) {
    if (Number.isNaN(+x) || Number.isNaN(+y) || x < 0 || y < 0) {
      throw new Error('Invalid coordinates (x, y) provided.');
    }
    this.x = x;
    this.y = y;
    this.active = active === true;
    this.id = `${x},${y}`;
  }

  /**
   * There are up to 8 possible neighboring cells around the current cell.
   *
   * [x - 1, y - 1] [x, y - 1] [x + 1, y - 1]
   * [x - 1, y    ] [x, y    ] [x + 1, y    ]
   * [x - 1, y + 1] [x, y + 1] [x + 1, y + 1]
   *
   * @param {boolean} hasInfected - Whether or not the infection has started
   * @return {Array} Up to 8 neighbors, or only up to 4, in case of infection.
   */
  getNeighbors(hasInfected = false) {
    const neighbors = [];

    // Horizontal
    if (this.x > 0) {
      neighbors.push(new Cell((this.x - 1), (this.y), false));
    }
    neighbors.push(new Cell((this.x + 1), (this.y), false));

    // Vertical
    if (this.y > 0) {
      neighbors.push(new Cell((this.x), (this.y - 1), false));
    }
    neighbors.push(new Cell((this.x), (this.y + 1), false));

    if (hasInfected !== true) {
      // Diagonal
      if (this.x > 0) {
        if (this.y > 0) {
          neighbors.push(new Cell((this.x - 1), (this.y - 1), false));
        }
        neighbors.push(new Cell((this.x - 1), (this.y + 1), false));
      }
      if (this.y > 0) {
        neighbors.push(new Cell((this.x + 1), (this.y - 1), false));
      }
      neighbors.push(new Cell((this.x + 1), (this.y + 1), false));
    }

    return neighbors;
  }
};
