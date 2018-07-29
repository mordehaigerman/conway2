/**
 * Conway 2
 */

const {
  describe, it, beforeEach, afterEach,
} = require('mocha');
const { expect } = require('chai');
const Cmd = require('../src/cmd.js');
const Grid = require('../src/grid.js');

describe('Cmd', () => {
  describe('#constructor', () => {
    describe('when no parameters are passed', () => {
      it('should throw an Error', () => {
        expect(() => new Cmd()).to.throw();
      });
    });

    describe('when invalid width or height is passed', () => {
      it('should throw an Error', () => {
        expect(() => new Cmd('bad')).to.throw();
        expect(() => new Cmd(0, 'bad')).to.throw();
        expect(() => new Cmd('bad', 0)).to.throw();
        expect(() => new Cmd(0, 0)).to.throw();
        expect(() => new Cmd(1, 0)).to.throw();
        expect(() => new Cmd(0, 1)).to.throw();
      });
    });

    describe('when valid width and height are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cmd(1, 1)).to.not.throw();
      });

      it('should assign width and height correctly', () => {
        expect(new Cmd(1, 1).width).to.equal(1);
        expect(new Cmd(1, 1).height).to.equal(1);
      });

      it('should assign grid correctly', () => {
        expect(new Cmd(1, 1).grid).to.deep.equal(Grid.createArray(1, 1));
      });
    });

    describe('when invalid mode is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cmd(1, 1, 'bad')).to.not.throw();
      });

      it('should assign mode correctly', () => {
        expect(new Cmd(1, 1, 'bad').mode).to.equal('bad');
      });
    });

    describe('when valid mode is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cmd(1, 1, '2d')).to.not.throw();
      });

      it('should assign mode correctly', () => {
        expect(new Cmd(1, 1, '2d').mode).to.equal('2d');
      });
    });
  });

  describe('#setMode', () => {
    describe('when no parameters are passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cmd(1, 1, '2d').setMode()).to.not.throw();
      });

      it('should force to default', () => {
        expect(new Cmd(1, 1, '2d').setMode().mode).to.equal('flat');
      });

      it('should be chainable (return itself)', () => {
        expect(new Cmd(1, 1, '2d').setMode()).to.be.an.instanceof(Cmd);
      });
    });

    describe('when invalid mode is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cmd(1, 1, '2d').setMode('bad')).to.not.throw();
      });

      it('should assign mode correctly', () => {
        expect(new Cmd(1, 1, '2d').setMode('bad').mode).to.equal('bad');
      });

      it('should be chainable (return itself)', () => {
        expect(new Cmd(1, 1, '2d').setMode('bad')).to.be.an.instanceof(Cmd);
      });
    });

    describe('when valid mode is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cmd(1, 1).setMode('2d')).to.not.throw();
      });

      it('should assign mode correctly', () => {
        expect(new Cmd(1, 1).setMode('2d').mode).to.equal('2d');
      });

      it('should be chainable (return itself)', () => {
        expect(new Cmd(1, 1).setMode('2d')).to.be.an.instanceof(Cmd);
      });
    });
  });

  describe('#setStdout', () => {
    describe('when no parameters are passed', () => {
      it('should throw an Error', () => {
        expect(() => new Cmd(1, 1).setStdout()).to.throw();
      });
    });

    describe('when invalid stdout is passed', () => {
      it('should throw an Error', () => {
        expect(() => new Cmd(1, 1).setStdout({})).to.throw();
      });
    });

    describe('when valid stdout is passed', () => {
      it('should not throw an Error', () => {
        expect(() => new Cmd(1, 1).setStdout({ write() {} })).to.not.throw();
      });

      it('should assign stdout correctly', () => {
        const stdout = { write() {} };
        expect(new Cmd(1, 1).setStdout(stdout).stdout).to.equal(stdout);
      });

      it('should be chainable (return itself)', () => {
        expect(new Cmd(1, 1).setStdout({ write() {} })).to.be.an.instanceof(Cmd);
      });
    });
  });

  describe('#out', () => {
    describe('when no parameters are passed', () => {
      const cmd = new Cmd(2, 2);
      let output;

      beforeEach(() => {
        output = '';
        cmd.setStdout({
          write(str) {
            output += str;
          },
        });
      });

      afterEach(() => {
        cmd.setStdout(cmd.stdout);
      });

      it('should not throw an Error', () => {
        expect(() => cmd.out()).to.not.throw();
      });

      it('should be chainable (return itself)', () => {
        expect(cmd.out()).to.be.an.instanceof(Cmd);
      });

      it('should ouput correctly in flat mode', () => {
        cmd.setMode('flat').out();
        expect(output).to.equal('0 0 0 0 \n');
      });

      it('should ouput correctly in 2d mode', () => {
        cmd.setMode('2d').out();
        expect(output).to.equal('0 0\n0 0\n');
      });

      it('should fallback to flat in unsupported mode', () => {
        cmd.setMode('bad').out();
        expect(output).to.equal('0 0 0 0 \n');
      });
    });
  });
});
