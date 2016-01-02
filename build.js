var fs = require("fs");
var browserify = require("browserify");

try{
  fs.statSync('./dist');
}catch(ex){

  fs.mkdirSync('dist');

}

browserify("./src/index.js", {
  standalone: 'jserator'
})
.transform("babelify", {presets: ['es2015', 'stage-0']})
.bundle()
.pipe(fs.createWriteStream("./dist/jserator.js"));
