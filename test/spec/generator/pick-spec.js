import pick from '../../../src/generator/pick';

describe('generator :: pick >>', () => {

  it('should work with normal aray', () => {
    var random = pick().inList([1, 2, 3]).between(1).to(1).$;
    expect(random.length).to.equal(1);
  });

  it('should produce list with duplication', () => {
    var random = pick().inList([1]).between(2).to(2).noDuplicate(false).$;
    expect(random.length).to.equal(2);
  });

  it('should work with no duplication on limit list member. Eg: pick 2 item in 1 item list', () => {
    var random = pick().inList([1]).between(2).to(2).$;
    expect(random.length).to.equal(2);
    expect(random).to.contain(undefined);
  });

  it('should work with list of object', () => {
    var random = pick().inList([{a: 1}, {b: 2}, {c: 4}]).between(1).to(2).$;
    expect(random.length).to.be.at.most(2);
    expect(random.length).to.be.at.least(1);
    expect(random[0]).to.be.instanceof(Object);
  })

});
