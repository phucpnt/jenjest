import faker from 'faker';
import makeFluentInterface from '../helper/make-fluent-interface';

export default makeFluentInterface(({or= null, emptyValue= null, chance=30}) => {

  var isEmpty = chance > faker.random.number({min: 1, max:100});
  if(isEmpty){
    return emptyValue;
  }
  else{
    return typeof(or.$) !=='undefined' ? or.$ : or;
  }

}, {
  chance: 'percent will return empty value',
  or: 'if not empty then return the value',
  emptyValue: 'empty value returned'
})
