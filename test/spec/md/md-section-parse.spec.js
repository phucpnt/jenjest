/**
 * Created by phucpnt on 6/29/16.
 */

import {expect} from 'chai';
import parseMd2Tree from '../../../src/md/parse-section-stream';

describe.only('markdown section parser', () => {
  
  const sampleMD = require('../../resources/md/simple.md');

  it('Given valid md String, it should parse correctly', () => {
    const pickFocusToken = token => {
      if(token.type ==='fence' && token.tag === 'code' && token.info==='javascript'){
        return token.content;
      }
      return null;
    };
    const tree = parseMd2Tree(pickFocusToken, sampleMD);
    console.log(tree);
    expect(tree).to.have.deep.property('[0].sectionPath', 'section_1');
    expect(tree).to.have.deep.property('[1].sectionPath', 'section_2.section_2_1');
  })
  

});
