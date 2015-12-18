/**
 * Created by Phuc on 12/17/2015.
 */

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

export default () => (next) => (src, ...availFuns) => {

  var generate = next(src, ...availFuns);
  return (...args) => (iterateObjOnFn(generate(args)));
}

function iterateObjOnFn(obj) {

  var valFunKeys = [], valObjKeys = [];

  Object.keys(obj).forEach((key) => {
    typeof obj[key] === 'function' && valFunKeys.push(key);
    typeof obj[key] === 'object' && valObjKeys.push(key);
  });

  valFunKeys.forEach((key) => {
    var fn = obj[key];
    obj[key] = fn.call(obj);
  });

  valObjKeys.forEach((key) => {
    obj[key] = iterateObjOnFn(obj[key]);
  });

  return obj;
}
