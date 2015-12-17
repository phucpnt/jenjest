/**
 * Created by Phuc on 12/17/2015.
 */

import makeGlobalAccessFn from '../helper/make-global-access';
import makeBlockParser from '../helper/block-grabber';
import _ from 'lodash';

export default () => {

  var compile = null;
  var builtCompile = false;
  var parse, directive_repeater;

  return function repeatee(next) {

    if (!builtCompile) {
      builtCompile = true;
      compile = repeatee(next);
      var tmp = directive(compile);
      parse = tmp.parse;
      directive_repeater = tmp.directive_repeater;
      makeGlobalAccessFn('directive_repeater', directive_repeater);
    }

    return (src) => ( next(parse(src)) );
  }

}


/**
 *
 * code will transform the following:
 * ```
 * [
 *   {
 *     'repeat:5': {
 *       field1: '...',
 *       field2: '...',
 *     }
 *   }
 * ]
 * ```
 * into:
 *
 * ```
 *   [].concat(directive_repeater(numRepeat, parseBlockIndex));
 * ```
 *
 **/


/**
 *
 * @param generator {Function}
 * @returns {{parse: parse, directive_repeater: directive_repeater}}
 */
function directive(generator) {

  var repeatIndicatorRegex = /'repeat\(\d+\)'\s*:\s*\{/ig;
  var repeatArrayRegex = /\[\s*\{\s*'repeat\((\d+)\)'\s*:\s*(\d+)\s*\}\s*\]/ig;

  var parsedBlocks = [];
  var parser = makeBlockParser(repeatIndicatorRegex, makePlaceHolder);

  function makePlaceHolder(index) {
    return index;
  }

  function parse(code) {
    /**
     * @type {String}
     **/
    var srcCode = parser.parse(code);
    parsedBlocks = parser.getCodeBlocks();

    return srcCode.replace(repeatArrayRegex, (match, p1, p2) => {
      return '[].concat(directive_repeater(' + [p1, p2].join(',') + '))';
    });
  }

  function directive_repeater(numRepeat, blockIndex) {
    var results = [];
    console.log(parsedBlocks[blockIndex]);
    for (var i = 0; i < numRepeat; i++) {
      results.push(generator(parsedBlocks[blockIndex]));
    }
    return results;
  }


  return {
    parse,
    directive_repeater
  };
}

