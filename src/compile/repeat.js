/**
 * Created by Phuc on 12/17/2015.
 */

import makeBlockParser from '../helper/block-grabber';
import _ from 'lodash';

export default () => (next) => (...availFuns) => (src) => {

  var generate = next(...availFuns, 'directive_repeater');

  return (...args) => {
    let {
      parse,
      directive_repeater
    } = directive();

    function directiveExec(src) {
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

  let repeatIndicatorRegex = /['"]repeat\((\d+),?\s*(\d+)?\)['"]\s*:\s*\{/ig;
  let repeatArrayRegex = /\[\s*\{\s*['"]repeat\((\d+),?\s*(\d+)?\)['"]\s*:\s*(\d+)\s*\}\s*\]/ig;

  let parsedBlocks = [];
  let cleanParsedBlocks = [];
  let parser = makeBlockParser(repeatIndicatorRegex, makePlaceHolder);

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

      return srcCode.replace(repeatArrayRegex, (match, p1, p2, p3) => {
        let repeaterParams = [p1, p3];
        if (p2) {
          repeaterParams.push(p2);
        }
        return '[].concat(directive_repeater(' + repeaterParams.join(',') + '))';
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

    return (numRepeat, blockIndex, maxRepeat) => {

      let results = [];
      let parsedCode = cleanParsedBlocks[blockIndex];

      let randomRepeat = numRepeat;
      if (maxRepeat && !isNaN(maxRepeat)) {
        randomRepeat = Math.round(Math.random() * (maxRepeat - numRepeat) + numRepeat);
      }

      for (var i = 0; i < randomRepeat; i++) {
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
