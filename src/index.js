/**
* Created by Phuc on 10/1/2015.
*/

import _ from 'lodash'

import makeCompile from './compile'
import makeRepeatCompile from './compile/repeat'
import makeContextFunctionCompile from './compile/context-function'
import makeValueGenerateCompile from './helper/makeValueGenerator'


export default function makeGenerator(src, availFuns = {}){

  var funIds = Object.keys(availFuns);
  var funs = _.map(funIds, (id) => availFuns[id]);

  var finalCompile = _.flowRight(
    makeRepeatCompile(), // should be first
    makeValueGenerateCompile(),
    makeContextFunctionCompile()
  )(makeCompile());


  return () => finalCompile(...funIds)(src)(...funs);
}
