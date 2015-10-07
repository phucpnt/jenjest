/**
 * Created by Phuc on 10/1/2015.
 */

var parser = require('../../src/index');
var exampleStr = require('../resources/json-generator.jsample.txt');


describe('Parser', () => {

  fdescribe('Parsing function', () => {
    it('should initialize normal', () => {
      var results = parser(exampleStr);
      console.log(results);
    });

    it('will not bug out when having undefined method inside generator schema.', () => {
      var results = parser(require('../resources/json-generator-not-defined-method.jsample.txt'));
      console.log(results);
    });

    it('support repeater', () => {
      var results = parser(require('../resources/repeat-simple.jsample.txt'));
      console.log(JSON.stringify(results, null, 2));
    });

  });

  describe('generator: float().max().min().decimal().format()', () => {

    it('should work with default setup', () => {
      var json = {
        foo: '{{float().$}}'
      };
      var results = parser(JSON.stringify(json));
      expect(parseFloat(results.foo)).toBeGreaterThan(1);
    });

    it('should support min(), max()', () => {
      var json = {
        foo: '{{float().min(2).max(10).$}}'
      };
      var results = parser(JSON.stringify(json));
      console.log(results);
      expect(parseFloat(results.foo)).toBeGreaterThan(2);
      expect(parseFloat(results.foo)).toBeLessThan(10);
    });
    it('should support decimal()', () => {
      var json = {
        foo: '{{float().min(99).max(99999).decimal(2).$}}'
      };
      var results = parser(JSON.stringify(json));
      console.log(results);
      expect(parseFloat(results.foo)).toBeGreaterThan(99);
      expect(parseFloat(results.foo)).toBeLessThan(99999);
    });
    it('should support format()', () => {
      var json = {
        foo: '{{float().min(99).max(99999).decimal(2).format("0,0.0000").$}}'
      };
      var results = parser(JSON.stringify(json));
      console.log(results);
      expect(typeof results.foo).toEqual("string")
    });

  })


});

