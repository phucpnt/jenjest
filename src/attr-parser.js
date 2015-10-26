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
var repeaterParser = require('./directives/repeat');


var repeaterBlocks = [];
function __repeater(index) {
  var codeBlock = repeaterBlocks[index];
  return parser(codeBlock);
}

var genPattern = /\{\{\s*(.*?)\s*\}\}/g;
var fnNamePattern = /(.+?)\(.*?\)/i;
var repeatPattern = /repeat\s*\(\s*(\d+)\s*\)\s*/i;

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

function arrayContainsNestedObj(arr) {
  return arr[0] && _.isPlainObject(arr[0]) && repeatPattern.test(Object.keys(arr[0])[0]);
}


function attrParser(attrVal) {

  if (_.isArray(attrVal)) {
    if (arrayContainsNestedObj(attrVal)) {
      var results = [];
      var nestedVal = attrVal[0];
      var keys = Object.keys(nestedVal);
      var key = keys[0];
      var repeaterIndex = nestedVal[key];
      var num = key.match(repeatPattern)[1];
      for (var i = 0; i < num; i++) {
        results = results.concat(__repeater(repeaterIndex));
      }
      return results;
    }
    else {
      return _.map(attrVal, (val) => {
        return attrParser(val);
      });
    }
  }
  else if (_.isPlainObject(attrVal)) {
    return _.mapValues(attrVal, (val) => {
      return attrParser(val)
    });
  }
  else {
    return _attrParser(attrVal);
  }

}

function parser(definedStr) {

  var parsedResult = repeaterParser(definedStr);

  if (parsedResult.code) {
    repeaterBlocks = parsedResult.repeaterBlocks;
    definedStr = parsedResult.code;
  }

  var rawObj;
  eval('rawObj = (' + definedStr + ');');

  return attrParser(rawObj);

}

module.exports.parse = parser;
