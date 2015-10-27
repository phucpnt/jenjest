/**
 * Created by Phuc on 10/26/2015.
 */

/**
 *
 * @param startRegex {RegExp}
 * @param makePlaceHolder {Function}
 * @returns {{parse: parse, getCodeBlocks: getCodeBlocks}}
 */
function createBlockGrabber(startRegex, makePlaceHolder) {

  var codeBlocks = [];
  var regexBlockStart = startRegex;

  function parseOne(code) {
    var matched = regexBlockStart.exec(code);
    if (matched == null) {
      return {};
    }
    var start = 1;
    var startBlock, searchPos;
    startBlock = searchPos = regexBlockStart.lastIndex;
    while (start != 0) {
      if (code[searchPos] === '{') {
        start++;
      }
      else if (code[searchPos] === '}') {
        start--;
      }
      searchPos++;
    }
    var codeBlock = '{' + code.substring(startBlock, searchPos);
    codeBlocks.push(codeBlock);
    var placeHolder = makePlaceHolder(codeBlocks.length - 1);


    return {
      parsedCode: code.replace(codeBlock, placeHolder),
      nextSearchPos: (startBlock - 1) + (placeHolder.length)
    };

  }

  function getCodeBlocks() {
    return codeBlocks;
  }


  function parse(code) {

    var parsedSrc = code;

    var parsedPos = 0;
    var end = false;

    while (!end) {
      var result = parseOne(parsedSrc);

      if (result.parsedCode) {
        parsedSrc = result.parsedCode;
      }
      parsedPos = result.nextSearchPos;

      if (!parsedPos || parsedPos >= parsedSrc.length) {
        end = true;
      }
    }

    return parsedSrc;
  }

  return {parse, getCodeBlocks};
}

module.exports = createBlockGrabber;
