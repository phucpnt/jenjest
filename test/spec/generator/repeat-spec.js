import j_repeat from '../../../src/generator/repeat';

describe('generator :: repeat >>', () => {

  it('given a random repeat number between 2 - 10, it should return the list correctly', () => {
    const genList = j_repeat(2).max(10).data(() => ({a: 1, b: 2})).$;
    expect(genList).to.have.length.above(2);
  });

  it('given a random repeat number 5, it should return the list correctly', () => {
    const genList = j_repeat(5).data(() => ({a: 1, b: 2})).$;
    console.log(genList, 1);
    expect(genList).to.have.lengthOf(5);
  });
});
