/**
 * Created by Phuc on 10/1/2015.
 */


var _ = require('lodash');
var objectId = require('./generator/object-id');


function attrParser(attrVal) {

  if (!_.isString(attrVal)) {
    return attrVal;
  }

  var pattern = /\{\{\s*(.*?)\s*\}\}/g;

  return attrVal.replace(pattern, (match, p1) => {
    var data;
    eval('try { data= '+p1 + '} catch(e){ data="__undefined--'+p1+'__"}');
    return data;
  });
}

export function parser(definedStr) {
  var rawObj = new Function('return (' + definedStr + ');').apply();
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
