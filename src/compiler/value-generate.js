/**
 * Created by Phuc on 12/15/2015.
 */

import _ from 'lodash';

var fieldGenPattern = /\{\{\s*(.*?)\s*\}\}/g;
var fnNamePattern = /(.+?)\(.*?\)/i;
var srcTemplate = _.template('(function() {<%= generators %> return (<%= src %>); }())');


export default (generators) => (next) => (src) => {

  var generatorEvalStrs = Object.keys(generators).forEach((key) => {
    window[key] = generators[key];
  });

  var parsedSrc = src.replace(fieldGenPattern, function (match, p1) {
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

  return next(parsedSrc);
}
