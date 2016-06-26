import faker from 'faker';
import makeFluentInterface, {makeTerminateWith$} from '../helper/make-fluent-interface';

export default makeFluentInterface((options, {key= false, value=true}) => {
  return faker.random.objectElement(options, key === true ? 'key': value);
}, {
  key: 'get key/index from options',
  value: 'get value from options',
});
