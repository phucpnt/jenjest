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
    j_objectId: objectId,
    j_float: genFloat,
    j_person: person,
    j_index: genIndex,
    j_date: gDate,
    j_pickOne: pickOne,
    j_string: gString,
    j_emptiable: emptiable,
    j_pick: pick,
    j_img: img,
    j_resource: resource,
  });
}
