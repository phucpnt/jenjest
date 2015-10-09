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
  console.log('>>> REPEAT CALL', codeBlock);
  return parser(codeBlock);
}

var genPattern = /\{\{\s*(.*?)\s*\}\}/g;
var fnNamePattern = /(.+?)\(.*?\)/i;
var repeatPattern = /repeat\s*\(\s*(\d+)\s*\)\s*/i;

function _attrParser(attrVal) {
  if (!_.isString(attrVal)) {
    return attrVal;
  }

  console.log('ATTR PARSER', attrVal);

  return attrVal.replace(genPattern, (match, p1) => {
    var data;
    var fnName = p1.match(fnNamePattern);

    console.log('ATTR PARSER', p1);

    if (eval('typeof (' + fnName[1] + ') !== "function"')) {
      return "__undefined--" + p1 + "__";
    }
    else {
      eval('data= ' + p1 + ';');
    }

    return data;
  });
}


function attrParser(attrVal, key, parent) {

  if (_.isArray(attrVal)) {
    var results = [];
    attrVal = attrVal[0];
    var keys = Object.keys(attrVal);
    if (keys.length === 1 && repeatPattern.test(keys[0])) {
      var key = keys[0];
      var repeaterIndex = attrVal[key];
      console.log('REPEAT KEY', key);
      var num = key.match(repeatPattern)[1];
      for(var i = 0; i < num; i++) {
        console.log(attrVal[key]);
        results = results.concat(__repeater(repeaterIndex));
      }
      return results;
    }
  }
  else{
    return _attrParser(attrVal);
  }

}

function parser(definedStr) {

  var parsedResult = repeaterParser(definedStr);

  if (parsedResult.code) {
    repeaterBlocks = parsedResult.repeaterBlocks;
    definedStr = parsedResult.code;
  }

  console.log(definedStr);

  var rawObj;
  eval('rawObj = (' + definedStr + ');');

  //var results;
  ////if (_.isArray(rawObj)) {
  ////  return attrParser(rawObj, null, null);
  ////}
  ////else {
  ////  results = {};
  ////}
  ////
  ////
  ////var keys = Object.keys(rawObj);
  ////if (keys.length === 1 && repeatPattern.test(keys[0])) {
  ////  var times = keys[0].match(repeatPattern)[1];
  ////  results = results.concat(attrParser(rawObj[keys[0]], keys[0], results, times));
  ////} else {
  ////  results = _.mapValues(rawObj, function (val, key) {
  ////    return attrParser(val, key, results);
  ////  });
  ////}
  if(!_.isArray(rawObj)){
    return _.mapValues(rawObj, function(val, key){
      return attrParser(val, key);
    });
  }
  else {
    return attrParser(rawObj);
  }
}

module.exports = parser;
