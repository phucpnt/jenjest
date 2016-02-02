import makeFluentInterface from './make-fluent-interface';
import faker from 'faker';

export default makeFluentInterface({
  word,
  sentence,
  paragraph
}, {
  amount: 'amount of item to be generated',
});


function word({amount = 3}){
  return faker.lorem.words(amount).join(' ');
}

function sentence({amount = 3}){
  return faker.lorem.sentences(amount);
}

function paragraph({amount = 3}){
  return faker.lorem.paragraphs(amount);
}
