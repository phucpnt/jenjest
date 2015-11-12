/**
 * Created by Phuc on 10/1/2015.
 */

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

var makeBlockParser = require('./_block-grabber');

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

export default directive;

