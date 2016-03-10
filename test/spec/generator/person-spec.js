/**
 * Created by Phuc on 12/17/2015.
 */

import person from '../../../src/generator/person';

describe('generator person info >>', () => {

  it('should gen first_name', () => {

    var firstName = person().gender('male').name().first_name().$;
    expect(typeof firstName).to.equal('string', 'First name');

  });

  it('should gen address.country', () => {

    var country = person().address().country().$;
    expect(typeof country).to.equal('string', 'Country');

  })

});
