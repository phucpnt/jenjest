/**
 * Created by Phuc on 10/7/2015.
 */

var numeral = require('numeral');

module.exports = () => {

  var attr = {
    min: 1,
    max: 9999,
    digit: 0,
    format_pattern: null
  };

  class GenFloat {
    min(min){
      attr.min = min;
      return this;
    }
    max(max){
      attr.max = max;
      return this;
    }
    decimal(digit){
      attr.digit = digit;
      return this;
    }
    format(pattern){
      attr.format_pattern = pattern;
      return this;
    }

    get $() {
      var max = attr.max;
      var min = attr.min;
      var dec = attr.digit;
      var formatPattern = attr.format_pattern;
      var genNum = (Math.round((Math.random() * (max - min) + min) * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
      if (formatPattern) {
        return numeral(genNum).format(formatPattern);
      }
      else {
        return genNum;
      }
    }
  }

  return new GenFloat();

};
