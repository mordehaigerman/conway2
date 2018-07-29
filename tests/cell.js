/**
 * Conway 2
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const Cell = require('../src/cell.js');

describe('Cell', () => {
  describe('#constructor', () => {
    describe('when no parameters are passed', () => {
      it('should throw an Error', () => {
        expect(() => new Cell()).to.throw();
      });
    });

    describe('when invalid x or y is passed', () => {
      it('should throw an Error', () => {
        expect(() => new Cell('bad')).to.throw();
        expect(() => new Cell(0, 'bad')).to.throw();
        expect(() => new Cell('bad', 0)).to.throw();
      });
    });

    describe('when invalid active is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cell(0, 0, 'bad')).to.not.throw();
      });
      it('should fallback to false', () => {
        expect(new Cell(0, 0, 'bad').active).to.equal(false);
      });
    });

    describe('when valid parameters are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cell(0, 0, true)).to.not.throw();
      });

      it('should assign properties correctly', () => {
        const x = 0;
        const y = 0;
        const active = true;
        const cell = new Cell(x, y, active);
        expect(cell.x).to.equal(x);
        expect(cell.y).to.equal(y);
        expect(cell.active).to.equal(active);
        expect(cell.id).to.be.a('string');
      });
    });
  });

  describe('#getNeighbors', () => {
    describe('when no hasInfected or falsly/invalid hasInfected is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cell(0, 0, true).getNeighbors()).to.not.throw();
        expect(() => new Cell(0, 0, true).getNeighbors(false)).to.not.throw();
        expect(() => new Cell(0, 0, true).getNeighbors('bad')).to.not.throw();
      });

      it('should be an instance of Array', () => {
        expect(new Cell(0, 0, true).getNeighbors()).to.be.an.instanceof(Array);
        expect(new Cell(0, 0, true).getNeighbors(false)).to.be.an.instanceof(Array);
        expect(new Cell(0, 0, true).getNeighbors('bad')).to.be.an.instanceof(Array);
      });

      it('should be an array of Cell instances', () => {
        new Cell(0, 0, true).getNeighbors().forEach((cell) => {
          expect(cell).to.be.an.instanceof(Cell);
        });
        new Cell(0, 0, true).getNeighbors(false).forEach((cell) => {
          expect(cell).to.be.an.instanceof(Cell);
        });
        new Cell(0, 0, true).getNeighbors('bad').forEach((cell) => {
          expect(cell).to.be.an.instanceof(Cell);
        });
      });

      it('should have length of 8, in case of not 0,0 cells', () => {
        expect(new Cell(1, 1, true).getNeighbors()).to.have.lengthOf(8);
        expect(new Cell(1, 1, true).getNeighbors(false)).to.have.lengthOf(8);
        expect(new Cell(1, 1, true).getNeighbors('bad')).to.have.lengthOf(8);
      });

      it('should have length of 3, in case of 0,0 cells', () => {
        expect(new Cell(0, 0, true).getNeighbors()).to.have.lengthOf(3);
        expect(new Cell(0, 0, true).getNeighbors(false)).to.have.lengthOf(3);
        expect(new Cell(0, 0, true).getNeighbors('bad')).to.have.lengthOf(3);
      });

      it('should have length of 5, in case of 0,1+ or 1+,0 cells', () => {
        expect(new Cell(1, 0, true).getNeighbors()).to.have.lengthOf(5);
        expect(new Cell(0, 1, true).getNeighbors()).to.have.lengthOf(5);
        expect(new Cell(1, 0, true).getNeighbors(false)).to.have.lengthOf(5);
        expect(new Cell(0, 1, true).getNeighbors(false)).to.have.lengthOf(5);
        expect(new Cell(1, 0, true).getNeighbors('bad')).to.have.lengthOf(5);
        expect(new Cell(0, 1, true).getNeighbors('bad')).to.have.lengthOf(5);
      });
    });

    describe('when true hasInfected is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cell(0, 0, true).getNeighbors(true)).to.not.throw();
      });

      it('should be an instance of Array', () => {
        expect(new Cell(0, 0, true).getNeighbors(true)).to.be.an.instanceof(Array);
      });

      it('should be an array of Cell instances', () => {
        new Cell(0, 0, true).getNeighbors(true).forEach((cell) => {
          expect(cell).to.be.an.instanceof(Cell);
        });
      });

      it('should have length of 4, in case of not 0,0 cell', () => {
        expect(new Cell(1, 1, true).getNeighbors(true)).to.have.lengthOf(4);
      });

      it('should have length of 2, in case of 0,0 cell', () => {
        expect(new Cell(0, 0, true).getNeighbors(true)).to.have.lengthOf(2);
      });

      it('should have length of 3, in case of 0,1+ or 1+,0 cell', () => {
        expect(new Cell(1, 0, true).getNeighbors(true)).to.have.lengthOf(3);
        expect(new Cell(0, 1, true).getNeighbors(true)).to.have.lengthOf(3);
      });
    });
  });
});
