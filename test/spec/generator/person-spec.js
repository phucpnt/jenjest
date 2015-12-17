/**
 * Created by Phuc on 12/17/2015.
 */

import person from '../../../src/generator/person';

describe('generator person info >>', () => {

  it('should gen first_name', () => {

    var firstName = person().gender('male').name().first_name().$;
    console.log(firstName);
    expect(typeof firstName).toEqual('string', 'First name');

  });

  it('should gen address.country', () => {

    var country = person().address().country().$;
    console.log(country);
    expect(typeof country).toEqual('string', 'Country');

  })

});