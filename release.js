
var package = require('./package.json');

!function increaseMinorVersion(){
  var currentVersion = package.version.split('.');
  var minorNum = currentVersion[2];
  currentVersion[2] = parseInt(minorNum)+1;

  var nextVersion = currentVersion.join('.')
}();

require('./build');
