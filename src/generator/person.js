/**
 * Created by Phuc on 12/17/2015.
 */

import faker from 'faker';
import makeFluentInterface from '../helper/make-fluent-interface';

export default makeFluentInterface(
    {
      name,
      address
    }
    , {gender: 'people gender: male, female'}
)

function name({gender}) {

  switch (gender) {
    case 'male':
      gender = 0;
      break;
    case 'female':
      gender = 1;
      break;
  }

  return {
    first_name: () => (faker.name.firstName(gender)),
    last_name: () => (faker.name.lastName(gender)),
    full_name: () => (faker.name.findName(null, null, gender))
  }
}

function address() {

  return {
    email: () => faker.internet.email(),
    website: () => faker.internet.url(),
    phone: () => faker.phone.phoneNumber(),
    city: () => faker.address.city(),
    streetAddress: () => faker.address.streetAddress(),
    country: () => faker.address.country(),
    countryCode: () => faker.address.countryCode(),
    zip: () => faker.address.zipCode(),
    state: () => faker.address.state(),
  }

}
