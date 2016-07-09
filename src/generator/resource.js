import makeFluentInterface from '../helper/make-fluent-interface';
import countries from '../../resource/countries.json';
import languages from '../../resource/languages.json';

export default makeFluentInterface(({
  country,
  language,
}) => {

  if(country === true){
    return countries;
  }

  if(language === true){
    return languages;
  }


}, {
  country: 'list of countries',
  language: 'list of language',
})
