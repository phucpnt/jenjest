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
import img from '../generator/img';
import resource from '../generator/resource';

export default function (){
  return makeValueGenerateCompile({
    j$objectId: objectId,
    j$float: genFloat,
    j$person: person,
    j$index: genIndex,
    j$date: gDate,
    j$pickOne,
    j$string: gString,
    j$emptiable: emptiable,
    j$pick: pick,
    j$img,
    j$resource,
  });
}
