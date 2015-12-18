/**
 * Created by Phuc on 12/17/2015.
 */

import makeBlockParser from '../helper/block-grabber';
import _ from 'lodash';

export default () => (next) => (...availFuns) => (src) => {

  var generate = next(...availFuns, 'directive_repeater');

  return (...args) => {
    var {parse, directive_repeater} = directive();

    var directiveExec = (src) => {
      return generate(src)(...args, directive_repeater(directiveExec));
    };

    var parsedCode = (parse(src));

    return generate(parsedCode)(...args, directive_repeater(directiveExec));

  };
};


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
 * @returns {{parse: parse, directive_repeater: directive_repeater}}
 */
function directive() {

  var repeatIndicatorRegex = /'repeat\(\d+\)'\s*:\s*\{/ig;
  var repeatArrayRegex = /\[\s*\{\s*'repeat\((\d+)\)'\s*:\s*(\d+)\s*\}\s*\]/ig;

  var parsedBlocks = [];
  var cleanParsedBlocks = [];
  var parser = makeBlockParser(repeatIndicatorRegex, makePlaceHolder);

  function makePlaceHolder(index) {
    return index;
  }

  function _parseRecur(parser) {

    var currentParsedBlockIndex = 0;

    function haveMoreParsingBlock() {
      return currentParsedBlockIndex < parsedBlocks.length;
    }

    function parseUnit(code) {
      /**
       * @type {String}
       **/
      var srcCode = parser.parse(code);
      var nuBlocks = parser.getCodeBlocks();

      if (nuBlocks.length > parsedBlocks.length) {
        parsedBlocks = parsedBlocks.concat(nuBlocks.slice(parsedBlocks.length));
      }

      return srcCode.replace(repeatArrayRegex, (match, p1, p2) => {
        return '[].concat(directive_repeater(' + [p1, p2].join(',') + '))';
      });

    }

    return (code) => {
      var parsedCode = parseUnit(code);
      while (haveMoreParsingBlock()) {
        cleanParsedBlocks.push(parseUnit(parsedBlocks[currentParsedBlockIndex]));
        currentParsedBlockIndex++;
      }
      return parsedCode;
    };

  }

  function parse(code) {
    return _parseRecur(parser)(code);
  }

  function directive_repeater(generator) {

    return (numRepeat, blockIndex) => {

      var results = [];
      var parsedCode = cleanParsedBlocks[blockIndex];
      for (var i = 0; i < numRepeat; i++) {
        results.push(generator(parsedCode));
      }
      return results;

    }

  }


  return {
    parse,
    directive_repeater
  };
}

