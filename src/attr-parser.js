/**
 * Created by Phuc on 10/1/2015.
 */

var _ = require('lodash');

/**
 * all available generator should be declared here
 */


var objectId = require('./generator/object-id');
var index = require('./generator/index');
var float = require('./generator/float');
var repeaterParser = require('./generator/repeat');


var repeaterBlocks = [];
function __repeater(index) {
  var codeBlock = repeaterBlocks[index];
  return parser(codeBlock);
}

var genPattern = /\{\{\s*(.*?)\s*\}\}/g;
var fnNamePattern = /(.+?)\(.*?\)/i;
var repeatPattern = /repeat\((\d+)\)/i;

function repeater(times, attrVal) {
  return _.times(times, () => {
    return _.mapValues(attrVal, function (val) {
      return attrParser(val);
    });
  });
}

function _attrParser(attrVal) {
  if (!_.isString(attrVal)) {
    return attrVal;
  }

  return attrVal.replace(genPattern, (match, p1) => {
    var data;
    var fnName = p1.match(fnNamePattern);

    if (eval('typeof (' + fnName[1] + ') !== "function"')) {
      return "__undefined--" + p1 + "__";
    }
    else {
      eval('data= ' + p1 + ';');
    }

    return data;
  });
}


function attrParser(attrVal, times = 0) {

  if (!times) {
    return _attrParser(attrVal);
  }
  else {
    return _.times(times, () => {
      return _attrParser(attrVal)
    });
  }

}

function parser(definedStr) {

  var parsedStr = repeaterParser(definedStr);

  if (parsedStr.code) {
    repeaterBlocks = parsedStr.repeaterBlocks;
  }

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
    results = results.concat(attrParser(rawObj[keys[0]], times));
  } else {
    results = _.mapValues(rawObj, function (val) {
      return attrParser(val);
    });
  }

  return results;
}

module.exports = parser;
