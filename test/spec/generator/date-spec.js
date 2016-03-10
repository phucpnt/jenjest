import gDate from '../../../src/generator/date';
import moment from 'moment';

describe('generator date >>', () => {
  it('should support generate date in the past', () => {
    let date = gDate().inPast('1day').$;
    expect(moment(date).isBefore(moment())).to.be.true;
  });
  it('should support generate date in the future', () => {
    let date = gDate().inFuture('7day').$;
    expect(moment(date).isAfter(moment())).to.be.true;
  });
  it('should support generate date in interval range', () => {
    let date = gDate().between().from('-2day').to('now').$;
    expect(moment(date).isBefore(moment())).to.be.true;

    date = gDate().between().from('-3day').to('-1day').$;
    expect(moment(date).isBefore(moment().subtract(1, 'day'))).to.be.true;
  });
  it('should support generate date in YYYY-MM-DD format', () => {
    let date = gDate().between().from('2016-01-01').to('2016-01-22').$;
    expect(moment(date).isBefore(moment())).to.be.true;
    expect(moment(date).isBefore(moment('2016-01-23'))).to.be.true;
  });
  it('support format result', () => {
    let date = gDate().inFuture('1day').format('YYYY-MM-DD').$;
    expect(/\d{4}-\d{2}-\d{2}/i.test(date)).to.be.true;
  })
})
