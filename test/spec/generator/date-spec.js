import gDate from '../../../src/generator/date';
import moment from 'moment';

fdescribe('generator date >>', () => {
  it('should support generate date in the past', () => {
    let date = gDate().inPast('1day').$;
    expect(moment(date).isBefore(moment())).toBe(true);
  });
  it('should support generate date in the future', () => {
    let date = gDate().inFuture('7day').$;
    expect(moment(date).isAfter(moment())).toBe(true);
  });
  it('should support generate date in interval range', () => {
    let date = gDate().between().from('-2day').to('now').$;
    expect(moment(date).isBefore(moment())).toBe(true);

    date = gDate().between().from('-3day').to('-1day').$;
    expect(moment(date).isBefore(moment().subtract(1, 'day'))).toBe(true);
  });
  it('should support generate date in YYYY-MM-DD format', () => {
    let date = gDate().between().from('2016-01-01').to('2016-01-22').$;
    expect(moment(date).isBefore(moment())).toBe(true, date.toString());
    expect(moment(date).isBefore(moment('2016-01-23'))).toBe(true, date.toString());
  });
})
