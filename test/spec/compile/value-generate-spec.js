/**
 * Created by Phuc on 12/15/2015.
 */


import makeCompile from '../../../src/compile'
import makeValueGenerateCompile from '../../../src/compile/value-generate'
import ObjectId from '../../../src/generator/object-id'


describe('Compile with value generated', () => {

  it('should work with string template include generator', () => {
    var finalCompile = makeValueGenerateCompile({'objectId': ObjectId})(makeCompile());

    var generate = finalCompile()(require('../../resources/json-generator.jsample.txt'));
    var data = generate();

    expect(typeof data).toEqual('object');
    expect(JSON.stringify(data)).not.toContain('objectId');

  });

  it('should work with direct field generate', () => {
    var finalCompile = makeValueGenerateCompile({'objectId': ObjectId})(makeCompile());
    var generate = finalCompile()(require('../../resources/json-generator-direct-field.jsample.txt'));
    var data = generate();

    expect(typeof data).toEqual('object');
    expect(JSON.stringify(data)).not.toContain('objectId');

  });


});
