import makeFluentInterface, {
  makeTerminateWith$
}
from './make-fluent-interface';
import moment from 'moment';
import faker from 'faker';

const intervalPattern = /(\+|-)?(\d+)\s*(day|week|month|year)s?/i;
const dayInSecond = 60 * 60 * 1000;
const intervalSecond = {
  day: 24 * dayInSecond,
  week: 7 * dayInSecond,
  month: 30 * dayInSecond,
  year: 365 * dayInSecond,
};
const second = 1000;

export default () => ({
  now: makeFluentInterface(({format=null}) => {
    const nowDate = moment();
    if(format!== null){
      return nowDate.format(format);
    }
    return nowDate;
  }, {
    format: 'format return date'
  }),
  inPast: makeFluentInterface(inPast, {
    format: 'format return date'
  }),
  inFuture: makeFluentInterface(inFuture, {
    format: 'format return date'
  }),
  between: makeFluentInterface(between, {
    from: 'from date: follow the format `YYYY-MM-DD` `YYYY-MM-DD HH:mm:ss`',
    to: 'to date: follow the format `YYYY-MM-DD` `YYYY-MM-DD HH:mm:ss`',
    format: 'format return date',
  })
});

function inPast(
  interval = '1day', {
    format = null
  }
) {
  const result = new Date(Date.now() - randomIntervalIn(interval));
  if (format !== null) {
    return moment(result).format(format);
  }
  return result;
}

function inFuture(
  interval = '1day', {
    format = null
  }
) {
  const result = new Date(Date.now() + randomIntervalIn(interval));
  if (format !== null) {
    return moment(result).format(format);
  }
  return result;
}

function between({
  from = 'now',
    to = 'tomorrow',
    format = null
}) {
  let dateFrom = parseDateStr(from);
  let dateTo = parseDateStr(to);

  let result = faker.random.number({
    min: Date.parse(dateFrom),
    max: Date.parse(dateTo),
    precision: second,
  })

  let genDate = new Date();
  genDate.setTime(result);

  if (format !== null) {
    return moment(genDate).format(format);
  }
  return genDate;
}

function parseDateStr(str) {

  if (str === 'now') {
    return new Date();
  }

  let interval = parseIntervalStr(str);
  if (interval !== null) {
    return new Date(Date.now() + interval);
  }

  let genDate = new Date();
  genDate.setTime(Date.parse(str));
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
    let negative = matchResult[1] === '-' ? -1 : 1;
    return negative * intervalSecond[unit] * amount;
  }
  return null;
}

function randomIntervalIn(intervalStr) {
  let parsedInterval = parseIntervalStr(intervalStr);
  if (parsedInterval === null) {
    return null;
  }
  let randomInterval = faker.random.number({
    min: second,
    max: Math.abs(parsedInterval),
    precision: second,
  });
  return parsedInterval < 0 ? -randomInterval : parsedInterval;
}

// function makeFormattableResult(fun) { // @todo: do not use
//
//   return (...args, {
//     formatStr = null
//   }) => {
//     const result = fun(...args);
//     if (formatStr !== null) {
//       return moment(result).format(formatStr);
//     }
//     return result;
//   }
//
// }
