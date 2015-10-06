/**
 * Created by Phuc on 10/1/2015.
 */

var parser = require('../../src/index');
var exampleStr = require('../resources/json-generator.sample.txt');


describe('Parser', () => {

  it('should initialize normal', () => {
    var results = parser.parser(exampleStr);
    console.log(results);
  });

  it('will not bug out when having undefined method inside generator schema.', () => {
    var results = parser.parser(require('../resources/json-generator-not-defined-method.sample.txt'));
    console.log(results);
  });

});

