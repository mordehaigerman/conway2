/**
 * Conway 2
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const Output = require('../src/output.js');
const Grid = require('../src/grid.js');

describe('Output', () => {
  describe('#constructor', () => {
    describe('when no parameters are passed', () => {
      it('should throw an Error', () => {
        expect(() => new Output()).to.throw();
      });
    });

    describe('when invalid width or height is passed', () => {
      it('should throw an Error', () => {
        expect(() => new Output('bad')).to.throw();
        expect(() => new Output(0, 'bad')).to.throw();
        expect(() => new Output('bad', 0)).to.throw();
        expect(() => new Output(0, 0)).to.throw();
        expect(() => new Output(1, 0)).to.throw();
        expect(() => new Output(0, 1)).to.throw();
      });
    });

    describe('when valid width and height are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1)).to.not.throw();
      });

      it('should assign width and height correctly', () => {
        expect(new Output(1, 1).width).to.equal(1);
        expect(new Output(1, 1).height).to.equal(1);
      });

      it('should assign grid correctly', () => {
        expect(new Output(1, 1).grid).to.deep.equal(Grid.createArray(1, 1));
      });
    });
  });

  describe('#out', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).out()).to.not.throw();
      });

      it('should be chainable (return itself)', () => {
        expect(new Output(1, 1).out()).to.be.an.instanceof(Output);
      });
    });
  });

  describe('#isInsideGrid', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).isInsideGrid()).to.not.throw();
      });

      it('should return false', () => {
        expect(new Output(1, 1).isInsideGrid()).to.equal(false);
      });
    });

    describe('when invalid x or y is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).isInsideGrid('bad', 0)).to.not.throw();
        expect(() => new Output(1, 1).isInsideGrid(0, 'bad')).to.not.throw();
        expect(() => new Output(1, 1).isInsideGrid('bad', 'bad')).to.not.throw();
        expect(() => new Output(1, 1).isInsideGrid(1, 0)).to.not.throw();
        expect(() => new Output(1, 1).isInsideGrid(0, 1)).to.not.throw();
        expect(() => new Output(1, 1).isInsideGrid(1, 1)).to.not.throw();
        expect(() => new Output(1, 1).isInsideGrid(-1, 0)).to.not.throw();
        expect(() => new Output(1, 1).isInsideGrid(0, -1)).to.not.throw();
        expect(() => new Output(1, 1).isInsideGrid(-1, -1)).to.not.throw();
      });

      it('should return false', () => {
        expect(new Output(1, 1).isInsideGrid('bad', 0)).to.equal(false);
        expect(new Output(1, 1).isInsideGrid(0, 'bad')).to.equal(false);
        expect(new Output(1, 1).isInsideGrid('bad', 'bad')).to.equal(false);
        expect(new Output(1, 1).isInsideGrid(1, 0)).to.equal(false);
        expect(new Output(1, 1).isInsideGrid(0, 1)).to.equal(false);
        expect(new Output(1, 1).isInsideGrid(1, 1)).to.equal(false);
        expect(new Output(1, 1).isInsideGrid(-1, 0)).to.equal(false);
        expect(new Output(1, 1).isInsideGrid(0, -1)).to.equal(false);
        expect(new Output(1, 1).isInsideGrid(-1, -1)).to.equal(false);
      });
    });

    describe('when valid x and y are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).isInsideGrid(0, 0)).to.not.throw();
      });

      it('should return true', () => {
        expect(new Output(1, 1).isInsideGrid(0, 0)).to.equal(true);
      });
    });
  });

  describe('#set', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).set()).to.not.throw();
      });

      it('should return false', () => {
        expect(new Output(1, 1).set()).to.equal(false);
      });
    });

    describe('when invalid x or y is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).set('bad', 0)).to.not.throw();
        expect(() => new Output(1, 1).set(0, 'bad')).to.not.throw();
        expect(() => new Output(1, 1).set('bad', 'bad')).to.not.throw();
        expect(() => new Output(1, 1).set(1, 0)).to.not.throw();
        expect(() => new Output(1, 1).set(0, 1)).to.not.throw();
        expect(() => new Output(1, 1).set(1, 1)).to.not.throw();
        expect(() => new Output(1, 1).set(-1, 0)).to.not.throw();
        expect(() => new Output(1, 1).set(0, -1)).to.not.throw();
        expect(() => new Output(1, 1).set(-1, -1)).to.not.throw();
      });

      it('should return false', () => {
        expect(new Output(1, 1).set('bad', 0)).to.equal(false);
        expect(new Output(1, 1).set(0, 'bad')).to.equal(false);
        expect(new Output(1, 1).set('bad', 'bad')).to.equal(false);
        expect(new Output(1, 1).set(1, 0)).to.equal(false);
        expect(new Output(1, 1).set(0, 1)).to.equal(false);
        expect(new Output(1, 1).set(1, 1)).to.equal(false);
        expect(new Output(1, 1).set(-1, 0)).to.equal(false);
        expect(new Output(1, 1).set(0, -1)).to.equal(false);
        expect(new Output(1, 1).set(-1, -1)).to.equal(false);
      });
    });

    describe('when valid x and y are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).set(0, 0)).to.not.throw();
      });

      it('should assign x and y correctly', () => {
        expect(new Output(1, 1).set(0, 0, true).grid[0][0]).to.equal(1);
        expect(new Output(1, 1).set(0, 0, false).grid[0][0]).to.equal(0);
        expect(new Output(1, 1).set(0, 0).grid[0][0]).to.equal(0);
      });

      it('should be chainable (return itself)', () => {
        expect(new Output(1, 1).set(0, 0)).to.be.an.instanceof(Output);
      });
    });

    describe('when invalid active is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).set(0, 0, 'bad')).to.not.throw();
      });

      it('should fallback to false', () => {
        expect(new Output(1, 1).set(0, 0, 'bad').grid[0][0]).to.equal(0);
      });

      it('should be chainable (return itself)', () => {
        expect(new Output(1, 1).set(0, 0, 'bad')).to.be.an.instanceof(Output);
      });
    });

    describe('when valid active is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).set(0, 0, true)).to.not.throw();
      });

      it('should assign active correctly', () => {
        expect(new Output(1, 1).set(0, 0, true).grid[0][0]).to.equal(1);
        expect(new Output(1, 1).set(0, 0, false).grid[0][0]).to.equal(0);
        expect(new Output(1, 1).set(0, 0).grid[0][0]).to.equal(0);
      });

      it('should be chainable (return itself)', () => {
        expect(new Output(1, 1).set(0, 0, true)).to.be.an.instanceof(Output);
      });
    });
  });

  describe('#run', () => {
    describe('when no parameters are passed', () => {
      it('should throw an Error', () => {
        expect(() => new Output(1, 1).run()).to.throw();
      });
    });

    describe('when invalid next is passed', () => {
      it('should throw an Error', () => {
        expect(() => new Output(1, 1).run('bad')).to.throw();
      });
    });

    describe('when valid next is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).run(() => {})).to.not.throw();
      });

      it('should call callback after a delay', (done) => {
        new Output(1, 1).run(() => done(), true);
      });

      it('should be chainable (return itself)', () => {
        expect(new Output(1, 1).run(() => {})).to.be.an.instanceof(Output);
      });
    });

    describe('when valid false hasChanged is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).run(() => {}, false)).to.not.throw();
      });

      it('should not call callback after a delay', (done) => {
        let isCalled = false;
        new Output(1, 1).run(() => {
          isCalled = true;
        }, false);
        setTimeout(() => done(isCalled), 1050);
      });

      it('should be chainable (return itself)', () => {
        expect(new Output(1, 1).run(() => {}, false)).to.be.an.instanceof(Output);
      });
    });

    describe('when valid true hasChanged is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Output(1, 1).run(() => {}, true)).to.not.throw();
      });

      it('should call callback after a delay', (done) => {
        new Output(1, 1).run(() => done(), true);
      });

      it('should be chainable (return itself)', () => {
        expect(new Output(1, 1).run(() => {}, true)).to.be.an.instanceof(Output);
      });
    });
  });
});
