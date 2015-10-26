/**
 * Created by Phuc on 10/26/2015.
 */

function createBlockGrabber(regexLabel) {

  var codeBlocks = [];

  function parseOne(code) {
    var regexBlockStart = new RegExp("'" + regexLabel + "'\s*:\s*\{", 'gi');
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

    var parsedPos = 0;
    var end = false;

    while (!end) {
      var result = parseOne(code);

      if (result.parsedCode) {
        code = result.parsedCode;
      }
      parsedPos = result.nextSearchPos;

      if (!parsedPos || parsedPos >= code.length) {
        end = true;
      }
    }
  }

  return {parse, getCodeBlocks};
}

module.exports = createBlockGrabber;
