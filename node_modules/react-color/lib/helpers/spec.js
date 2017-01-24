'use strict';

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('helpers/color', function () {
  test('simpleCheckForValidColor', function () {
    test('throws on null', function () {
      var data = null;
      expect(function () {
        return _color2.default.simpleCheckForValidColor(data);
      }).to.throw(TypeError);
    });

    test('throws on undefined', function () {
      var data = undefined;
      expect(function () {
        return _color2.default.simpleCheckForValidColor(data);
      }).to.throw(TypeError);
    });

    test('no-op on number', function () {
      var data = 255;
      expect(_color2.default.simpleCheckForValidColor(data)).to.equal(data);
    });

    test('no-op on NaN', function () {
      var data = NaN;
      expect(_color2.default.simpleCheckForValidColor(data)).to.be.NaN;
    });

    test('no-op on string', function () {
      var data = 'ffffff';
      expect(_color2.default.simpleCheckForValidColor(data)).to.equal(data);
    });

    test('no-op on array', function () {
      var data = [];
      expect(_color2.default.simpleCheckForValidColor(data)).to.equal(data);
    });

    test('no-op on rgb objects with numeric keys', function () {
      var data = { r: 0, g: 0, b: 0 };
      expect(_color2.default.simpleCheckForValidColor(data)).to.equal(data);
    });

    test('no-op on an object with an r g b a h s v key mapped to a NaN value', function () {
      var data = { r: NaN };
      expect(_color2.default.simpleCheckForValidColor(data)).to.equal(data);
    });
  });

  test('toState', function () {
    test('returns an object giving a color in all formats', function () {
      expect(_color2.default.toState('red')).to.deep.equal({
        hsl: { a: 1, h: 0, l: 0.5, s: 1 },
        hex: '#ff0000',
        rgb: { r: 255, g: 0, b: 0, a: 1 },
        hsv: { h: 0, s: 1, v: 1, a: 1 },
        oldHue: 0,
        source: undefined
      });
    });

    test('gives hex color with leading hash', function () {
      expect(_color2.default.toState('blue')).to.include({
        hex: '#0000ff'
      });
    });
  });

  test('isValidHex', function () {
    test('allows strings of length 3, 6, or 8', function () {
      expect(_color2.default.isValidHex('f')).to.be.false;
      expect(_color2.default.isValidHex('ff')).to.be.false;
      expect(_color2.default.isValidHex('fff')).to.be.true;
      expect(_color2.default.isValidHex('ffff')).to.be.false;
      expect(_color2.default.isValidHex('fffff')).to.be.false;
      expect(_color2.default.isValidHex('ffffff')).to.be.true;
      expect(_color2.default.isValidHex('fffffff')).to.be.false;
      expect(_color2.default.isValidHex('ffffffff')).to.be.true;
      expect(_color2.default.isValidHex('fffffffff')).to.be.false;
      expect(_color2.default.isValidHex('ffffffffff')).to.be.false;
      expect(_color2.default.isValidHex('fffffffffff')).to.be.false;
      expect(_color2.default.isValidHex('ffffffffffff')).to.be.false;
    });

    test('allows strings without leading hash', function () {
      // Check a sample of possible colors - doing all takes too long.
      for (var i = 0; i <= 0xffffff; i += 0x010101) {
        var hex = ('000000' + i.toString(16)).slice(-6);
        expect(_color2.default.isValidHex(hex)).to.be.true;
      }
    });

    test('allows strings with leading hash', function () {
      // Check a sample of possible colors - doing all takes too long.
      for (var i = 0; i <= 0xffffff; i += 0x010101) {
        var hex = ('000000' + i.toString(16)).slice(-6);
        expect(_color2.default.isValidHex('#' + hex)).to.be.true;
      }
    });

    test('is case-insensitive', function () {
      expect(_color2.default.isValidHex('ffffff')).to.be.true;
      expect(_color2.default.isValidHex('FfFffF')).to.be.true;
      expect(_color2.default.isValidHex('FFFFFF')).to.be.true;
    });

    test('does not allow non-hex characters', function () {
      expect(_color2.default.isValidHex('gggggg')).to.be.false;
    });

    test('does not allow numbers', function () {
      expect(_color2.default.isValidHex(0xffffff)).to.be.false;
    });
  });
}); /* global test, expect */