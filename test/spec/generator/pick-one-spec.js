import pickOne from '../../../src/generator/pick-one';

describe('generator pick one >>', () => {

  it('should work', () => {

    let options = ['apple', 'banana', 'cherry'];
    let result = pickOne(options).$;

    expect(options.indexOf(result) >= 0).to.be.true;

  });

});
