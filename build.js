var fs = require("fs");
var browserify = require("browserify");
var babelify = require('babelify');

try{
  fs.statSync('./dist');
}catch(ex){

  fs.mkdirSync('dist');

}

browserify("./src/index.js", {
  standalone: 'jserator',
  debug: true,
})
.transform(babelify.configure({
  presets: ['es2015', 'stage-0'],
  sourceMap: true,
}))
.bundle()
.pipe(fs.createWriteStream("./dist/jserator.js"));
