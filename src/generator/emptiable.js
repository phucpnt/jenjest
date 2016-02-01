import faker from 'faker';
import makeFluentInterface from './make-fluent-interface';

export default makeFluentInterface(({or= null, val= null, chance=30}) => {

  var isEmpty = chance > faker.random().number({min: 1, max:100});
  if(isEmpty){
    return val;
  }
  else{
    return or;
  }

}, {
  chance: 'percent will return empty value',
  or: 'if not empty then return the value',
  val: 'empty value returned'
})
