import j_string from '../../../src/generator/string';

describe('generator :: string >>', () => {

  it('given seed `hs`, it should produce random words which contains `hs`', () => {
    const randomWords = j_string().seed('hs').word().$
    expect(randomWords).to.contain('hs');
  })

});
