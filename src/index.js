/**
* Created by Phuc on 10/1/2015.
*/

import _ from 'lodash'

import makeCompile from './compile'
import makeRepeatCompile from './compile/repeat'
import makeValueGenerateCompile from './compile/value-generate'
import makeContextFunctionCompile from './compile/context-function'


export default function makeGenerator(src, availFuns = {}){

  var funIds = Object.keys(availFuns);
  var funs = _.map(funIds, (id) => availFuns[id]);

  var finalCompile = _.flowRight(
    makeRepeatCompile(), // should be first
    buildValueGenerateCompile(),
    makeContextFunctionCompile()
  )(makeCompile());

  return () => compile()(src)(...funs);
}


function buildValueGenerateCompile(){
  return makeValueGenerateCompile({
    objectId: require('./generator/object-id'),
    float: require('./generator/float'),
    person: require('./generator/person'),
    objectId: require('./generator/object-id')
  });
}
