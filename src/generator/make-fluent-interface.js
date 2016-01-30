/**
 * Created by Phuc on 12/17/2015.
 */

import _ from 'lodash'

/**
 *
 * @param  {mixed: function, Object} mixed the core of generator
 * @param  {Object} attrsWithDescription description for generator defined attributes
 * @return {function} the wrapped generator which make sure to return the final value only when invoke `$` at the end
 *                        predefined generator spec
 */
export default (mixed, attrsWithDescription) => {

  if (typeof mixed === 'function') {
    return makeFluentForFun(mixed, attrsWithDescription);
  }

  if (typeof mixed === 'object') {
    return makeFluentForApi(mixed, attrsWithDescription);
  }

}

export function makeTerminateWith$(fn) {

  return (...args) => {

    var result = fn(...args);

    if (typeof result === 'function') {
      return makeTerminateWith$(result);
    } else if (_.isPlainObject(result)) {
      return _.mapValues(result, function(val) {
        return makeTerminateWith$(val);
      })
    } else {
      return {
        get $() {
          return result;
        }
      }
    }

  }

}


function makeFluentForApi(api, attrsWithDescription) {

  return () => {
    var obj = makeFluentObj(attrsWithDescription);

    _.forEach(api, (val, key) => {
      if (typeof val === 'function') {
        obj[key] = makeTerminateWith$(() => (val(obj._attrs)));
      }
    });

    return obj;
  }

}

function makeFluentForFun(fn, attrsWithDescription) {
  return (...args) => {
    var obj = makeFluentObj(attrsWithDescription);

    Object.defineProperty(obj, "$", {
      get: function() {
        return fn.call(null, ...args, this._attrs);
      }
    });

    return obj;
  };
}


function makeFluentObj(attrsWithDescription) {
  var obj = {
    _attrs: {}
  };
  _.forEach(attrsWithDescription, function(description, key) {
    obj[key] = ((attr) => (configVal) => {
      if (typeof configVal === 'undefined') {
        configVal = true;
      }
      obj._attrs[attr] = configVal;
      return obj;
    })(key);
  });

  return obj;
}
