import gDate from '../../../src/generator/date';
import moment from 'moment';

fdescribe('generator date >>', () => {
  it('should support generate date in the past', () => {
    let date = gDate().interval('1day').inPast().$;
    expect(moment(date).isBefore(moment())).toBe(true);
  });
  it('should support generate date in the future', () => {
    let date = gDate().interval('7day').inFuture().$;
    expect(moment(date).isAfter(moment())).toBe(true);
  });
  it('should support generate date in interval range', () => {
    let date = gDate().from('-2day').to('now').between().$;
    expect(moment(date).isBefore(moment())).toBe(true);

    date = gDate().from('-3day').to('-1day').between().$;
    expect(moment(date).isBefore(moment().subtract(1, 'day'))).toBe(true);
  });
  it('should support generate date in YYYY-MM-DD format', () => {
    let date = gDate().from('2016-01-01').to('2016-01-22').between().$;
    expect(moment(date).isBefore(moment())).toBe(true, date.toString());
    expect(moment(date).isBefore(moment('2016-01-23'))).toBe(true, date.toString());
  });
})
