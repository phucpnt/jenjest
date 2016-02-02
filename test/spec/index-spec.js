/**
 * Created by Phuc on 12/11/2015.
 */

import makeGenerator from '../../src/index'


fdescribe('Integration test', () => {

  it('should work probably', () => {

    const exampleStr = require('../resources/int/activity.jsample.txt');
    const generate = makeGenerator(exampleStr);

    let demo1 = generate();
    expect(typeof demo1).toEqual('object');
  })

});
