/**
 * Conway 2
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const Grid = require('../src/grid.js');
const Cell = require('../src/cell.js');

describe('Grid', () => {
  describe('#constructor', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Grid()).to.not.throw();
      });

      it('should assign an empty cells object', () => {
        expect(new Grid().cells).to.deep.equal({});
      });
    });
  });

  describe('#add', () => {
    describe('when no cell or an invalid cell is passed', () => {
      it('should throw an Error', () => {
        expect(() => new Grid().add()).to.throw();
        expect(() => new Grid().add('bad')).to.throw();
      });
    });

    describe('when a valid cell is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Grid().add(new Cell(0, 0))).to.not.throw();
      });

      it('should be assigned correctly', () => {
        const cell = new Cell(0, 0);
        expect(new Grid().add(cell).get(cell.id)).to.equal(cell);
      });
    });
  });

  describe('#get', () => {
    describe('when no identifier or an invalid identifier is passed', () => {
      it('should throw an Error', () => {
        expect(() => new Grid().get()).to.throw();
        expect(() => new Grid().get('bad')).to.throw();
      });
    });

    describe('when a valid identifier is passed', () => {
      it('should not throw an Error', () => {
        const cell = new Cell(0, 0);
        expect(() => new Grid().add(cell).get(cell.id)).to.not.throw();
      });

      it('should be returned correctly', () => {
        const cell = new Cell(0, 0);
        expect(new Grid().add(cell).get(cell.id)).to.equal(cell);
      });
    });
  });

  describe('#has', () => {
    describe('when no identifier or an invalid identifier is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Grid().has()).to.not.throw();
        expect(() => new Grid().has('bad')).to.not.throw();
      });

      it('should return false', () => {
        expect(new Grid().has()).to.equal(false);
        expect(new Grid().has('bad')).to.equal(false);
      });
    });

    describe('when a valid identifier is passed', () => {
      it('should not throw an Error', () => {
        const cell = new Cell(0, 0);
        expect(() => new Grid().add(cell).has(cell.id)).to.not.throw();
      });

      it('should return true', () => {
        const cell = new Cell(0, 0);
        expect(new Grid().add(cell).has(cell.id)).to.equal(true);
      });
    });
  });

  describe('#getAll', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Grid().getAll()).to.not.throw();
      });

      it('should return a valid object', () => {
        const cell = new Cell(0, 0);
        expect(new Grid().getAll()).to.deep.equal({});
        expect(new Grid().add(cell).getAll()).to.deep.equal({ [cell.id]: cell });
      });
    });
  });

  describe('#asString', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Grid().asString()).to.not.throw();
      });

      it('should return a valid string', () => {
        const cell = new Cell(0, 0);
        expect(new Grid().asString()).to.deep.equal('[]');
        expect(new Grid().add(cell).asString()).to.deep.equal('["0,0,0"]');
      });
    });
  });

  describe('#countActiveNeighbors', () => {
    describe('when no cell or an invalid cell is passed', () => {
      it('should throw an Error', () => {
        expect(() => new Grid().countActiveNeighbors()).to.throw();
        expect(() => new Grid().countActiveNeighbors('bad')).to.throw();
      });
    });

    describe('when a valid cell is passed', () => {
      it('should not throw an Error', () => {
        const cell = new Cell(0, 0);
        expect(() => new Grid().countActiveNeighbors(cell)).to.not.throw();
      });

      it('should return a correct number', () => {
        const cell = new Cell(0, 0);
        expect(new Grid().countActiveNeighbors(cell)).to.equal(0);
        expect(
          new Grid().add(new Cell(1, 0, true)).countActiveNeighbors(cell),
        ).to.equal(1);
      });
    });

    describe('when an invalid haInfected is passed', () => {
      it('should not throw an Error', () => {
        const cell = new Cell(0, 0);
        expect(() => new Grid().countActiveNeighbors(cell, 'bad')).to.not.throw();
      });

      it('should ingnored and return a correct number', () => {
        const cell = new Cell(0, 0);
        expect(new Grid().countActiveNeighbors(cell, 'bad')).to.equal(0);
        expect(
          new Grid().add(new Cell(1, 0, true)).countActiveNeighbors(cell, 'bad'),
        ).to.equal(1);
      });
    });

    describe('when a valid haInfected is passed', () => {
      it('should not throw an Error', () => {
        const cell = new Cell(0, 0);
        expect(() => new Grid().countActiveNeighbors(cell, false)).to.not.throw();
      });

      it('should return a correct number in case of no infection', () => {
        const cell = new Cell(0, 0);
        expect(new Grid().countActiveNeighbors(cell, false)).to.equal(0);
        expect(
          new Grid().add(new Cell(1, 0, true)).countActiveNeighbors(cell, false),
        ).to.equal(1);
      });

      it('should return a correct number in case of infection', () => {
        const cell = new Cell(0, 0);
        expect(new Grid().countActiveNeighbors(cell, true)).to.equal(0);
        expect(
          new Grid().add(new Cell(1, 0, true)).countActiveNeighbors(cell, true),
        ).to.equal(1);
      });

      it('should ignores diagonal cells in case of infection', () => {
        const cell = new Cell(0, 0);
        expect(
          new Grid().add(new Cell(1, 1, true)).countActiveNeighbors(cell, true),
        ).to.equal(0);
      });
    });
  });

  describe('#fromArray', () => {
    describe('when no array or an invalid array is passed', () => {
      it('should throw an Error', () => {
        expect(() => Grid.fromArray()).to.throw();
        expect(() => Grid.fromArray('bad')).to.throw();
      });
    });

    describe('when a valid array is passed', () => {
      it('should not throw an Error', () => {
        expect(() => Grid.fromArray([])).to.not.throw();
      });

      it('should return a correct Grid object', () => {
        const cell = new Cell(0, 0, true);
        expect(Grid.fromArray([])).to.be.instanceof(Grid);
        expect(Grid.fromArray([])).to.deep.equal(new Grid());
        expect(Grid.fromArray([[cell.x, cell.y]])).to.deep.equal(new Grid().add(cell));
      });
    });
  });

  describe('#fromString', () => {
    describe('when no parameters are provided', () => {
      it('should throw an Error', () => {
        expect(() => Grid.fromString()).to.throw();
        expect(() => Grid.fromArray('bad')).to.throw();
      });
    });

    describe('when invalid width or height is passed', () => {
      it('should throw an Error', () => {
        expect(() => Grid.fromString('', 1, 'bad')).to.throw();
        expect(() => Grid.fromString('', 'bad', 1)).to.throw();
        expect(() => Grid.fromString('', 'bad', 'bad')).to.throw();
        expect(() => Grid.fromString('', 1, 0)).to.throw();
        expect(() => Grid.fromString('', 0, 1)).to.throw();
        expect(() => Grid.fromString('', 0, 0)).to.throw();
      });
    });

    describe('when valid width and height are passed', () => {
      it('should not throw an Error', () => {
        expect(() => Grid.fromString('', 1, 1)).to.not.throw();
      });

      it('should return a correct Grid object', () => {
        const cell = new Cell(0, 0, true);
        expect(Grid.fromString('', 1, 1)).to.be.instanceof(Grid);
        expect(Grid.fromString('', 1, 1)).to.deep.equal(new Grid());
        expect(Grid.fromString('1', 1, 1)).to.deep.equal(new Grid().add(cell));
      });
    });
  });

  describe('#createArray', () => {
    describe('when no/invalid parameters are provided', () => {
      it('should throw an Error', () => {
        expect(() => Grid.createArray()).to.throw();
        expect(() => Grid.createArray(1)).to.throw();
        expect(() => Grid.createArray(1, 0)).to.throw();
        expect(() => Grid.createArray(0, 1)).to.throw();
        expect(() => Grid.createArray(0, 0)).to.throw();
        expect(() => Grid.createArray(-1, -1)).to.throw();
      });
    });

    describe('when valid width and height are passed', () => {
      it('should not throw an Error', () => {
        expect(() => Grid.createArray(1, 1)).to.not.throw();
      });

      it('should return a correct grid array', () => {
        expect(Grid.createArray(1, 1)).to.be.instanceof(Array);
        expect(Grid.createArray(1, 1)).to.deep.equal([[0]]);
      });
    });
  });
});
