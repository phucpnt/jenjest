import makeFluentInterface from './make-fluent-interface';
import moment from 'moment';
import faker from 'faker';

const intervalPattern = /(\+|-)?(\d+)\s*(day|week|month|year)s?/i
const dayInSecond = 60 * 60 * 1000;
const intervalSecond = {
  day: 24 * dayInSecond
  week: 7 * dayInSecond,
  month: 30 * dayInSecond,
  year: 365 * dayInSecond,
};
const second = 1000;

export default makeFluentInterface({
  inPast,
  inFuture,
  between
}, {
  interval: '',
  format: 'format datetime return',
  from: 'from date: follow the format `YYYY-MM-DD` `YYYY-MM-DD HH:mm:ss`',
  to: 'to date: follow the format `YYYY-MM-DD` `YYYY-MM-DD HH:mm:ss`',
});


function inPast({
  interval = '1day'
}) {
  let now = Date.parse(Date.now());
  let randomInterval = faker.random.number({
    min: second,
    max: parseIntervalStr(interval)
    precision: second,
  });
  var genDate = new Date();
  genDate.setTime(now - randomInterval);
  return genDate;
}

function inFuture({
  interval = '1day'
}) {
  return inPast('-' + interval.replace('+', ''));
}

function between({
  from: 'now',
  to: 'tomorrow'
}) {

  let dateFrom = parseDateStr(from);
  let dateTo = parseDateStr(to);

  let result = faker.random.range({
    min: Date.parse(dateFrom),
    max: Date.parse(dateTo),
    precision: second,
  })

  let genDate = new Date();
  genDate.setTime(result);

  return genDate;
}

function parseDateStr(str) {

  if (str === 'now') {
    return Date.now();
  }

  if (parseIntervalStr(str) !== null) {
    return inFuture(str)
  }

  let genDate = new Date();
  genDate.setTime(Date.parse(str).getTime());
  return genDate;
}

/**
 * parse interval string
 * @param  {String} intervalStr
 * @return {Numeral}
 */
function parseIntervalStr(intervalStr) {
  let matchResult = intervalPattern.exec(intervalStr);
  if (matchResult !== null) {
    let amount = parseInt(matchResult[2]);
    let unit = matchResult[3];
    return intervalSecond[unit] * amount;
  }
  return null;
}
