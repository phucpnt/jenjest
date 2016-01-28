import gDate from '../../../src/generator/date';
import moment from 'moment';

fdescribe('generator date >>', () => {
  it('should support generate date in the past', () => {
    let date = gDate().inPast('1day');
    expect(moment(date).isBefore(moment())).toBe(true);
  })
})
