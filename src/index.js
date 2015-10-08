/**
 * Created by Phuc on 10/1/2015.
 */

var _ = require('lodash');
var attrParser = require('./attr-parser');

var repeatPattern = /repeat\((\d+)\)/i;


function repeater(times, attrVal) {
  return _.times(times, () => {
    return _.mapValues(attrVal, function (val) {
      return attrParser(val);
    });
  });
}

module.exports = function parser(definedStr) {
  var rawObj;
  eval('rawObj = (' + definedStr + ');');

  var results;
  if (_.isArray(rawObj)) {
    rawObj = rawObj[0];
    results = [];
  }
  else {
    results = {};
  }

  var keys = Object.keys(rawObj);
  if (keys.length === 1 && repeatPattern.test(keys[0])) {
    var times = keys[0].match(repeatPattern)[1];
    results = results.concat(repeater(times, rawObj[keys[0]]));
  }
  else {
    results = _.mapValues(rawObj, function (val) {
      return attrParser(val);
    });
  }

  return results;
};

