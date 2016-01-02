import makeValueGenerateCompile from '../compile/value-generate'

import objectId from '../generator/object-id';
import genFloat from '../generator/float';
import person from '../generator/person';
import genIndex from '../generator/index';

export default function buildValueGenerateCompile(){
  return makeValueGenerateCompile({
    objectId: objectId,
    float: genFloat,
    person: person,
    index: genIndex
  });
}
