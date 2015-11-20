/**
 * Created by Phuc on 11/11/2015.
 */

import makeDirective from '../../../src/directives/function'

fdescribe('Function Directive >', () => {
  var directive;

  beforeEach(() => {
    directive = makeDirective((codeBlock) => {
      return codeBlock;
    });
  });

  it('should render parsed code correctly', () => {
    var parsedCode = directive.parse(require('../../resources/function-simple.jsample.txt'));
    expect(parsedCode).toContain("_defer_function(0, gen)");
    console.log(parsedCode);
    var _defer_function = directive._defer_function;

    var result = eval(parsedCode);
    console.log(result);
  });


});
