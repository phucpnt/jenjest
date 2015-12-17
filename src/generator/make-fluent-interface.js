/**
 * Created by Phuc on 12/17/2015.
 */

import _ from 'lodash'

export default (mixed, attrsWithDescription) => {

  if (typeof mixed === 'function') {
    return makeFluentForFun(mixed, attrsWithDescription);
  }

  if (typeof mixed === 'object') {
    return makeFluentForApi(mixed, attrsWithDescription);
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
  return () => {
    var obj = makeFluentObj(attrsWithDescription);

    Object.defineProperty(obj, "$", {get: function(){
      return fn.call(null, this._attrs);
    }});

    return obj;
  };
}


function makeFluentObj(attrsWithDescription) {
  var obj = {_attrs: {}};
  _.forEach(attrsWithDescription, function (description, key) {
    obj[key] = ((attr) => (configVal) => {
      obj._attrs[attr] = configVal;
      return obj;
    })(key);
  });

  return obj;
}

function makeTerminateWith$(fn) {

  return (...args) => {

    var result = fn(...args);

    if (typeof result === 'function') {
      return makeTerminateWith$(result);
    }
    else if (typeof result === 'object') {
      return _.mapValues(result, function (val) {
        return makeTerminateWith$(val);
      })
    }
    else {
      return {
        get $() {
          return result;
        }
      }
    }

  }

}
