/**
 * Conway 2
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const Game = require('../src/game.js');
const Grid = require('../src/grid.js');
const Output = require('../src/output.js');
const Cmd = require('../src/cmd.js');

describe('Cell', () => {
  describe('#constructor', () => {
    describe('when no/invalid parameters are passed', () => {
      it('should throw an Error', () => {
        expect(() => new Game()).to.throw();
        expect(() => new Game('bad')).to.throw();
        expect(() => new Game('bad', 'bad')).to.throw();
      });
    });

    describe('when valid parameters are passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        const output = new Output(1, 1);
        expect(() => new Game(grid, cmd)).to.not.throw();
        expect(() => new Game(grid, output)).to.not.throw();
      });

      it('should assign properties correctly', () => {
        const grid = Grid.fromString('1', 1, 1);
        const output = new Output(1, 1);
        const game = new Game(grid, output, 1, 1);
        expect(game.output).to.deep.equal(output);
        expect(game.grid).to.deep.equal(grid);
        expect(game.generation).to.equal(1);
        expect(game.maxGenerations).to.equal(1);
        expect(game.infectAfter).to.equal(1);
      });
    });
  });

  describe('#setGrid', () => {
    describe('when no/invalid grid is passed', () => {
      it('should throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(() => new Game(grid, cmd).setGrid()).to.throw();
        expect(() => new Game(grid, cmd).setGrid('bad')).to.throw();
      });
    });

    describe('when a valid grid is passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(() => new Game(grid, cmd).setGrid(grid)).to.not.throw();
      });

      it('should be assigned correctly', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(
          new Game(Grid.fromString('1 1 1 1', 2, 2), cmd).setGrid(grid).grid,
        ).to.deep.equal(grid);
      });

      it('should be chainable (return itself)', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(new Game(grid, cmd).current()).to.be.instanceof(Game);
      });
    });
  });

  describe('#getGrid', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(() => new Game(grid, cmd).getGrid()).to.not.throw();
      });
    });

    describe('when a valid grid is passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(() => new Game(grid, cmd).getGrid()).to.not.throw();
      });

      it('should be assigned correctly', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(new Game(grid, cmd).getGrid()).to.deep.equal(grid);
      });
    });
  });

  describe('#hasInfected', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(() => new Game(grid, cmd).hasInfected()).to.not.throw();
      });

      it('should return a correct value', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(new Game(grid, cmd).hasInfected()).to.equal(false);
        expect(new Game(grid, cmd, 1, 1).hasInfected()).to.equal(true);
      });
    });
  });

  describe('#current', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(() => new Game(grid, cmd).current()).to.not.throw();
      });

      it('should be chainable (return itself)', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(new Game(grid, cmd).current()).to.be.instanceof(Game);
      });
    });
  });

  describe('#padGrid', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(() => new Game(grid, cmd).padGrid()).to.not.throw();
      });

      it('should be chainable (return itself)', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(new Game(grid, cmd).padGrid()).to.be.instanceof(Game);
      });
    });
  });

  describe('#next', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(() => new Game(grid, cmd).next()).to.not.throw();
      });

      it('should be chainable (return itself)', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(new Game(grid, cmd).next()).to.be.instanceof(Game);
      });
    });
  });

  describe('#shouldBeInNextGeneration', () => {
    describe('when no cell or invalid cell is passed', () => {
      it('should throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(() => new Game(grid, cmd).shouldBeInNextGeneration()).to.throw();
        expect(() => new Game(grid, cmd).shouldBeInNextGeneration('bad')).to.throw();
      });
    });

    describe('when a valid cell is passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(
          () => new Game(grid, cmd).shouldBeInNextGeneration(grid.get('0,0')),
        ).to.not.throw();
      });

      it('should return a correct value', () => {
        const grid = Grid.fromString('1', 1, 1);
        const cmd = new Cmd(1, 1);
        expect(
          new Game(grid, cmd).shouldBeInNextGeneration(grid.get('0,0')),
        ).to.equal(false);
      });
    });
  });

  describe('#play', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        const grid = Grid.fromString('1', 1, 1);
        const output = new Output(1, 1);
        expect(() => new Game(grid, output).play()).to.not.throw();
      });

      it('should be chainable (return itself)', () => {
        const grid = Grid.fromString('1', 1, 1);
        const output = new Output(1, 1);
        expect(new Game(grid, output).play()).to.be.instanceof(Game);
      });
    });
  });
});
