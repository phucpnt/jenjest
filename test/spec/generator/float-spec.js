/**
 * Created by Phuc on 12/17/2015.
 */

import float from '../../../src/generator/float';

describe('generator float number >>', () => {

  it('should gen number correctly with decimal digit = 0', () => {
    var random = float().min(10).max(1000).$;
    expect(random).toBeLessThan(1000);
  });


  it('should gen number correctly with number of decimal digit', () => {
    var random = float().min(10).max(1000).decimal(2).$;
    expect(random).toBeLessThan(1000);
  });
});
