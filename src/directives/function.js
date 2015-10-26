/**
 * Created by Phuc on 10/17/2015.
 */

var functionPlaceHolders = [];

function functionBlockParser(code){

  var functionBlockStart = /function\(.*?\)'\s*:\s*\{/ig;
  var matched = functionBlockStart.exec(code);

  if (matched == null) {
    return {};
  }
  var start = 1;
  var startBlock, searchPos;
  startBlock = searchPos = functionBlockStart.lastIndex;
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
  functionPlaceHolders.push(codeBlock);
  var placeHolder = makePlaceHolder(functionPlaceHolders.length - 1);


  return {
    parsedCode: code.replace(codeBlock, placeHolder),
    nextSearchPos: (startBlock - 1) + (placeHolder.length)
  };

}

function makePlaceHolder(index) {
  return "_defer_function(index)";
}
