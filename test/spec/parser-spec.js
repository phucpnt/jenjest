/**
 * Created by Phuc on 10/1/2015.
 */

var parser = require('../../src/index');
var exampleStr = require('../resources/json-generator.sample.txt');


describe('Parser', () => {

  it('should work normal', () => {
    console.log(exampleStr);
    console.log(parser);
    var results = parser.parser(exampleStr);
    console.log(results);
  });

});

