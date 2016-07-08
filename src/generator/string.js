import makeFluentInterface from '../helper/make-fluent-interface';
import faker from 'faker';

export default makeFluentInterface({
  word,
  sentence,
  paragraph
}, {
  amount: 'amount of item to be generated',
  seed: 'put seed string randomly inside the produced string',
});


function word({amount = 3, seed = null}){
  let finalWords = faker.lorem.words(amount);
  if(seed){
    finalWords = putSeedString(seed, finalWords);
  }
  return finalWords;
}

function sentence({amount = 3}){
  return faker.lorem.sentences(amount);
}

function paragraph({amount = 3}){
  return faker.lorem.paragraphs(amount);
}

function putSeedString(seed, words){
  const seedPos = Math.floor(Math.random() * words.length);
  return [words.slice(0, seedPos), seed, words.slice(seedPos)].join('');
}
