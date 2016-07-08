/**
 * Created by Phuc on 12/15/2015.
 * @deprecated use the generator `repeat` instead
 */

import _ from 'lodash';
import {expect} from 'chai';

import makeCompile from '../../../src/compile'
import makeRepeatCompile from '../../../src/compile/repeat'
import makeValueGenerateCompile from '../../../src/compile/value-generate'
import makeContextFunctionCompile from '../../../src/compile/context-function'

import ObjectId from '../../../src/generator/object-id'


describe('Compile with repeat generator', () => {
  var finalCompile = makeRepeatCompile()(makeCompile());

  it('should work with simple schema', () => {
    var generate = finalCompile()(require('../../resources/repeat/simple.jsample.txt'));

    var data = generate();
    expect(typeof data).to.equal('object');

  });

  it('should work with nested schema', () => {
    var generate= finalCompile()(require('../../resources/repeat/nested.jsample.txt'));
    var data = generate();

    expect(typeof data).to.equal('object');

  });

  it('should with with value generating compile', () => {

    var finalCompile = _.flowRight(
        makeRepeatCompile(),
        makeValueGenerateCompile({
          objectId: ObjectId
        })
    )(makeCompile());

    var generate = finalCompile()(require('../../resources/repeat/simple.jsample.txt'));
    var data = generate()

    var jsonData = JSON.stringify(data, null, 2);
    expect(typeof data).to.equal('object');
    expect(jsonData).not.to.contain('objectId');

  });

  it('should with with context function compile', () => {

    var finalCompile = _.flowRight(
        makeRepeatCompile(),
        makeContextFunctionCompile()
    )(makeCompile());

    var generate= finalCompile()(require('../../resources/repeat/function-context.jsample.txt'));
    var data = generate();

    var jsonData = JSON.stringify(data, null, 2);
    expect(jsonData).to.contain('Hello Phuc PNT');

  });

  it('should with with full compile', () => {

    var finalCompile = _.flowRight(
        makeRepeatCompile(), // should be first
        makeValueGenerateCompile({
          objectId: ObjectId
        }),
        makeContextFunctionCompile()
    )(makeCompile());


    var generate = finalCompile()(require('../../resources/repeat/function-context.jsample.txt'));
    var data = generate();

    var jsonData = JSON.stringify(data, null, 2);
    expect(typeof data).to.equal('object');
    expect(jsonData).to.contain('Hello Phuc PNT');
    expect(jsonData).not.to.contain('objectId');

  });

});
