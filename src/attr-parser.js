/**
 * Created by Phuc on 10/1/2015.
 */


var _ = require('lodash');


function attrParser(attrVal) {

  if (!_.isString(attrVal)) {
    return attrVal;
  }

  var pattern = /\{\{(.*?)\}\}/g;

  return attrVal.replace(pattern, (match, p1) => {
    return p1;
  });
}

export function parser(definedStr) {
  var rawObj = new Function('return (' + definedStr + ');').apply();
  var results;
  if (_.isArray(rawObj)) {
    rawObj = rawObj[0];
    results = [];
  }
  else{
    results = {}
  }

  results = _.mapValues(rawObj, function (val) {
    return attrParser(val);
  });

  return results;
}
