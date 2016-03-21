import faker from 'faker';
import makeFluentInterface, {makeTerminateWith$} from './make-fluent-interface';

export default makeFluentInterface(({cat, w, h}) => {
  return cat === 'avatar' ? faker.image.avatar() : faker.image[cat](w, h);
}, {
  cat: 'category which image belongs to',
  w: 'image width',
  h: 'image height',
});
