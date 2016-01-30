/**
 * Created by Phuc on 12/15/2015.
 */

import _ from 'lodash';
import {makeTerminateWith$} from '../generator/make-fluent-interface';

var fieldGenPattern = /\{\{\s*(.*?)\s*\}\}/g;
var fnNamePattern = /(.+?)\(.*?\)/i;
var srcTemplate = _.template('(function() {<%= generators %> return (<%= src %>); }())');


export default (generators) => (next) => (...availFuns) => (src) => {

  var parsedSrc = src.replace(fieldGenPattern, function (match, p1) {
    var fnName = p1.match(fnNamePattern)[1];

    if (typeof generators[fnName] !== 'function') {
      return "__undefined--" + p1 + "__";
    }
    var fn = Function.prototype.constructor.call(null, fnName, `return ${p1};`);
    return fn(generators[fnName]);
  });

  var availGeneratorNames = Object.keys(generators);
  var generate = next(availGeneratorNames.concat(availFuns))(parsedSrc);
  var availGenerators = availGeneratorNames.map((name) => generators[name]);

  return (...args) => (generate.call(null, ...availGenerators, ...args))

}
