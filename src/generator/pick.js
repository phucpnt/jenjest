import faker from 'faker';
import makeFluentInterface, {makeTerminateWith$} from './make-fluent-interface';

export default makeFluentInterface(({inList, between, to, noDuplicate = true}) => {
  const randAmount = faker.random.number({min: between, max: to});
  let pickList = [];
  let tmpList = [].concat(inList);
  for(let i = 0; i < randAmount.length; i++){
    let pickIndex = faker.random.number({min: 0, max: tmpList.length -1});
    pickList.push(tmpList[pickIndex]);

    if(noDuplicate){
      tmpList.splice(pickIndex, 1);
    }
    
  }
  return pickList;
}, {
  inList: 'list of elements to pick'
  between: 'random lower bound amount',
  to: 'random upper bound amount',
  noDuplicate: 'no duplicated in picked list'
});
