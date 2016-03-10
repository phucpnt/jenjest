/**
 * Created by Phuc on 12/11/2015.
 */

import makeGenerator from '../../src/index';
import {expect} from 'chai';
import fs from 'fs';


describe('Integration test', () => {

  it('should work probably', () => {

    const exampleStr = require('../resources/int/activity.jsample.txt');
    const generate = makeGenerator(exampleStr);

    let demo1 = generate();
    expect(typeof demo1).to.equal('object');
    console.log(JSON.stringify(demo1, null, 2));
  })

});
