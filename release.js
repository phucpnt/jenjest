var fs = require('fs');

!function increaseMinorVersion(){
  var package = require('./package.json');
  var currentVersion = package.version.split('.');
  var minorNum = currentVersion[2];
  currentVersion[2] = parseInt(minorNum)+1;

  var nextVersion = currentVersion.join('.');
  package.version = nextVersion;

  fs.writeFileSync('package.json', JSON.stringify(package, null, 2), {encoding: 'utf8'});

}();

require('./build');
