/**
 * Created by Phuc on 11/11/2015.
 */

import makeDirective from '../../../src/directives/function'

describe('Function Directive >', () => {
  var directive;

  beforeEach(() => {
    directive = makeDirective((codeBlock) => {
      return codeBlock;
    });
  });

  it('should render parsed code correctly', () => {
    var parsedCode = directive.parse(require('../../resources/function-simple.jsample.txt'));
    expect(parsedCode).toContain("_defer_function(0, gen)");
    var _defer_function = directive._defer_function;

    var contextWrapper = function () {
      return this;
    };
    var result = eval(['contextWrapper.call(', parsedCode, ')'].join(''));
    console.log(result);
  });


});
