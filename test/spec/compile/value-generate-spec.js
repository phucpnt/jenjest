/**
 * Created by Phuc on 12/15/2015.
 */


import makeCompile from '../../../src/compile'
import makeValueGenerateCompile from '../../../src/compile/value-generate'
import ObjectId from '../../../src/generator/object-id'


fdescribe('Compile with value generated', () => {

  it('should work with string template', () => {
    var finalCompile = makeValueGenerateCompile({'objectId': ObjectId})(makeCompile());

    var data = finalCompile(require('../../resources/json-generator.jsample.txt'));

    expect(typeof data).toEqual('object');
    expect(JSON.stringify(data)).not.toContain('objectId');

  });

  it('should work with direct field generate', () => {
    var finalCompile = makeValueGenerateCompile({'objectId': ObjectId})(makeCompile());

    var data = finalCompile(require('../../resources/json-generator-direct-field.jsample.txt'));

    expect(typeof data).toEqual('object');
    expect(JSON.stringify(data)).not.toContain('objectId');
    console.log(data);

  });


});