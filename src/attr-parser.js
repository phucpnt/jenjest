/**
 * Created by Phuc on 10/1/2015.
 */

/**
 * all available generator should be declared here
 */
var _ = require('lodash');
var objectId = require('./generator/object-id');
var index = require('./generator/index');
var float = require('./generator/float');

var genPattern = /\{\{\s*(.*?)\s*\}\}/g;
var fnNamePattern = /(.+?)\(.*?\)/i;


function attrParser(attrVal) {

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

  results = _.mapValues(rawObj, function (val) {
    return attrParser(val);
  });

  return results;
}
