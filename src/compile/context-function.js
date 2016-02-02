/**
 * Created by Phuc on 12/17/2015.
 */

import _ from 'lodash';

/**
 * This module provide allow generated value built with function.
 * The function allow use this as the closest object where it was wrapped in
 * example:
 * {
 *   firstname: 'Phuc'
 *   lastname: 'PNT'
 *   hello: function(){
 *      return ['hello', this.firstname, this.lastname].join(' ');
 *   }
 * }
 */

export default () => (next) => (...availFuns) => (src) => {

  var generate = next(...availFuns)(src);
  return (...args) => (iterateObjOnFn(generate(...args)));
}

function iterateObjOnFn(obj) {

  if (obj !== null && typeof obj !== 'undefined') {

    let valFunKeys = [],
      valObjKeys = [];

    Object.keys(obj).forEach((key) => {
      typeof obj[key] === 'function' && valFunKeys.push(key);
      typeof obj[key] === 'object' && valObjKeys.push(key);
    });

    valFunKeys.forEach((key) => {
      let fn = obj[key];
      obj[key] = fn.call(obj);
    });

    valObjKeys.forEach((key) => {
      obj[key] = iterateObjOnFn(obj[key]);
    });
  }

  return obj;
}
