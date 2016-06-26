/**
 * Created by Phuc on 10/7/2015.
 */
import makeFluentInterface from '../helper/make-fluent-interface';

var numeral = require('numeral');

export default makeFluentInterface(({min=0, max=9999, decimal = 0, format_pattern=null}) => {

  var genNum = random(min, max, decimal);

  if (format_pattern) {
    return numeral(genNum).format(format_pattern);
  }

  return genNum;

}, {
  min: 'min',
  max: 'max',
  decimal: 'decimal digit',
  format_pattern: 'produce number string with predefined format'
});

/**
 * @param min
 * @param max
 * @param dec decimal point
 * @returns {Number}
 */
function random(min = 0, max = 9999, dec = 0) {
  return Number((Math.round((Math.random() * (max - min) + min) * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec));
}
