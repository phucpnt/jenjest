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
 *   [].concat(_repeat1(), {});
 *
 *   function _repeat1() {
 *    return {
 *      field1: '...',
 *      field2: '...'
 *    }
 *   }
 * ```
 *
 **/

var makeBlockParser = require('./_block-grabber');
var repeaterBlocks = [];

function directive(code) {

  var repeatIndicatorRegex = /'repeat\(\d+\)'\s*:\s*\{/ig;
  var repeatArrayRegex = /\['repeat\((\d+)\)'\s*:\s*(\d+)\s*\]/ig;
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

  }


  return {
    parse,
    directive_repeater
  };
}

module.exports = directive;

