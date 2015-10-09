/**
 * Created by Phuc on 10/1/2015.
 */

var repeaterBlocks = [];

function makePlaceHolder(index) {
  return index;
}

function repeaterBlockParser(code) {
  var repeatBlockStart = /'repeat\(\d+\)'\s*:\s*\{/ig;
  var matched = repeatBlockStart.exec(code);
  if (matched == null) {
    return {};
  }
  var start = 1;
  var startBlock, searchPos;
  startBlock = searchPos = repeatBlockStart.lastIndex;
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
  repeaterBlocks.push(codeBlock);
  var placeHolder = makePlaceHolder(repeaterBlocks.length - 1);


  return {
    parsedCode: code.replace(codeBlock, placeHolder),
    nextSearchPos: (startBlock - 1) + (placeHolder.length)
  };
}

function repeaterSourceParser(code) {

  var parsedPos = 0;
  var end = false;

  while (!end) {
    var result = repeaterBlockParser(code);

    if (result.parsedCode) {
      code = result.parsedCode;
    }
    parsedPos = result.nextSearchPos;

    if (!parsedPos || parsedPos >= code.length) {
      end = true;
    }
  }

  return {code: code, repeaterBlocks: repeaterBlocks};
}

module.exports = repeaterSourceParser;

