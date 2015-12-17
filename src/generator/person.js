/**
 * Created by Phuc on 12/17/2015.
 */

import faker from 'faker';
import makeFluentInterface from './make-fluent-interface';

export default makeFluentInterface(
    function (attrs) {

      return {
        name: () => (name(attrs.gender)),
        address
      };
    }
    , {gender: 'people gender: male, female'}
)

function name(gender) {

  switch (gender) {
    case 'male':
      gender = 0;
      break;
    case 'female':
      gender = 1;
      break;
  }

  return {
    first_name: () => ( faker.name.firstName(gender)),
    last_name: () => ( faker.name.lastName(gender)),
    full_name: () => (faker.name.findName(null, null, gender))
  }
}

function address() {

  return {
    city: () => ( faker.address.city()),
    country: () => ( faker.address.country()),
    countryCode: () => ( faker.address.countryCode())
  }

}