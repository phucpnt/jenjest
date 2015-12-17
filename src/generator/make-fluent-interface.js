/**
 * Created by Phuc on 12/17/2015.
 */

import _ from 'lodash'

export default (generateFun, attrsWithDescription) => () => {

  var obj = {
    _attrs: {},
    get $() {
      return generateFun(this._attrs);
    }
  };

  _.forEach(attrsWithDescription, function (description, key) {
    obj[key] = ((attr) => (configVal) => {
      obj._attrs[attr] = configVal;
      return obj;
    })(key);
  });

  return obj;

}