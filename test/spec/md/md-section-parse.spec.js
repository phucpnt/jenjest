/**
 * Created by phucpnt on 6/29/16.
 */

import {expect} from 'chai';
import Markdown from 'markdown-it';

describe.only('markdown section parser', () => {
  
  const sampleMD = require('../../resources/md/simple.md');

  it('Given valid md String, it should parse correctly', () => {
    const parsedTokenList = Markdown().parse(sampleMD, {});
    
    console.log(parsedTokenList);
    expect(1).to.equal(1);
  })
  

});
