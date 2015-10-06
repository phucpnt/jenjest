/**
 * Created by Phuc on 10/1/2015.
 */
var _ = require('lodash');

module.exports = function () {

  return {
    get $() {
      return _.uniqueId();
    }
  };

};

