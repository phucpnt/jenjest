/**
 * Created by Phuc on 10/7/2015.
 */
import makeFluentInterface from './make-fluent-interface'

var numeral = require('numeral');

//module.exports = () => {
//
//  var attr = {
//    min: 1,
//    max: 9999,
//    digit: 0,
//    format_pattern: null
//  };
//
//  class GenFloat {
//    min(min) {
//      attr.min = min;
//      return this;
//    }
//
//    max(max) {
//      attr.max = max;
//      return this;
//    }
//
//    decimal(digit) {
//      attr.digit = digit;
//      return this;
//    }
//
//    format(pattern) {
//      attr.format_pattern = pattern;
//      return this;
//    }
//
//    get $() {
//      var max = attr.max;
//      var min = attr.min;
//      var dec = attr.digit;
//      var formatPattern = attr.format_pattern;
//      var genNum = (Math.round((Math.random() * (max - min) + min) * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
//      if (formatPattern) {
//        return numeral(genNum).format(formatPattern);
//      }
//      else {
//        return genNum;
//      }
//    }
//  }
//
//  return new GenFloat();
//
//};

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

