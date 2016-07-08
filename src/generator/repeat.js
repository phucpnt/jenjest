import _ from 'lodash';
import makeFluentInterface from '../helper/make-fluent-interface';

export default makeFluentInterface((min = 1, { data, max }) => {
      if (typeof data !== 'function') {
        throw new Error('Data should be function for generating concrete value');
      }
      let numRepeat = min;
      if (max && max > min) {
        numRepeat = Math.floor(Math.random() * (max - min + 1) + min);
      }
      return _.times(numRepeat, data);
    }, {
      data: 'data schema for generate repeat object',
      max: 'max number of list of data',
    }
);
