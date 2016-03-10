/**
 * Created by Phuc on 12/15/2015.
 */

import {expect} from 'chai';
import makeCompile from '../../../src/compile'
import makeContextFunctionCompile from '../../../src/compile/context-function'


describe('Compile with context function generator', () => {
  var finalCompile = makeContextFunctionCompile()(makeCompile());

  it('should work with simple flat schema', () => {

    var generate = finalCompile()(require('../../resources/context-function/static.jsample.txt'));
    var data = generate();

    expect(typeof data).to.equal('object');

  });

  it('should work with nested schema', () => {
    var generate = finalCompile()(require('../../resources/context-function/static-nested.jsample.txt'));
    var data = generate();
    expect(typeof data).to.equal('object');

  });


});
