/**
 * Created by Phuc on 10/17/2015.
 */

/**
 *
 * code will transform the following:
 * ```
 * [
 *   {
 *     'hello': function(gen) => {
 *        return 'hello'+ ' '+  this.firstName + ' '+ this.lastName;
 *     }
 *   }
 * ]
 * ```
 * into:
 *
 * ```
 * [
 *   {
 *     'hello': _defer_function(index, gen),
 *   }
 * ]
 * ```
 *
 **/

var makeBlockParser = require('./_block-grabber');
/**
 *
 * @param generator
 * @returns {{parse: parse, _defer_function: _defer_function}}
 */
function functionBlockParser(generator) {

  var functionIndicatorRegex = /function\(gen\)\s*\{/ig;
  //var repeatArrayRegex = /\[\s*\{\s*'repeat\((\d+)\)'\s*:\s*(\d+)\s*\}\s*\]/ig;

  var parsedBlocks = [];
  var parser = makeBlockParser(functionIndicatorRegex, makePlaceHolder);

  function makePlaceHolder(index) {
    return '{return __defer_function(' + index + ', gen)}';
  }

  function parse(code) {
    /**
     * @type {String}
     **/
    var srcCode = parser.parse(code);
    parsedBlocks = parser.getCodeBlocks();

    return srcCode;
  }

  function _defer_function(index) {
    return parsedBlocks[index]
  }


  return {
    parse,
    _defer_function
  };

}

export default functionBlockParser
