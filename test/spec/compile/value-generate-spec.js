/**
 * Created by Phuc on 12/15/2015.
 */


import makeCompile from '../../../src/compile'
import makeValueGenerateCompile from '../../../src/compiler/value-generate'
import ObjectId from '../../../src/generator/object-id'


fdescribe('Compile with value generated', () => {

  it('should work', () => {
    var finalCompile = makeValueGenerateCompile({'objectId': ObjectId})(makeCompile());

    var data = finalCompile(require('../../resources/json-generator.jsample.txt'));

    expect(typeof data).toEqual('object');
    expect(JSON.stringify(data)).not.toContain('objectId');


  });

});