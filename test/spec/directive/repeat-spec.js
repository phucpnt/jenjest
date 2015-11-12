/**
 * Created by Phuc on 11/11/2015.
 */

import makeDirective from '../../../src/directives/repeat'

describe('Repeater Directive >', () => {
  var directive;

  beforeEach(() => {
    directive = makeDirective((codeBlock) => {
      return codeBlock;
    });
  });

  it('should render parsed code correctly', () => {
    var parsedCode = directive.parse(require('../../resources/repeat-simple.jsample.txt'));
    expect(parsedCode).toContain("[].concat(directive_repeater(5,0))");
    console.log(parsedCode);
  });

  it('should functional correctly', () => {
    var parsedCode = directive.parse(require('../../resources/repeat-simple.jsample.txt'));
    //noinspection JSUnusedLocalSymbols
    var directive_repeater = directive.directive_repeater;
    var result = eval(parsedCode);

    expect(result.length).toEqual(5);

  });


});
