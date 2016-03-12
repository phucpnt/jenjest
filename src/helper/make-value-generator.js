import makeValueGenerateCompile from '../compile/value-generate'

import objectId from '../generator/object-id';
import genFloat from '../generator/float';
import person from '../generator/person';
import genIndex from '../generator/index';
import gDate from '../generator/date';
import pickOne from '../generator/pick-one';
import gString from '../generator/string';
import emptiable from '../generator/emptiable';
import pick from '../generator/pick';

export default function (){
  return makeValueGenerateCompile({
    objectId: objectId,
    float: genFloat,
    person: person,
    index: genIndex,
    date: gDate,
    pickOne,
    gString,
    emptiable,
    pick,
  });
}
