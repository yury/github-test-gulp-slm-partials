
var gulp         = require('gulp');
var express      = require('express');

var livereload   = require("gulp-livereload");
// var prettify     = require('gulp-prettify');
var slm          = require("gulp-slm");
var watch        = require('gulp-watch');

gulp.task('express', function() {
  var app = express();
  app.use(express.static(__dirname));
  app.listen(4444);
});

var slmFiles  = [
  "./slm/partials/*.slm",
  "./slm/*.slm"
]
var slmOutput = "./dist/html";

gulp.task('slm', function(){
  return gulp.src(slmFiles)
    .pipe(slm())
    .pipe(gulp.dest(slmOutput));
});

// var prettifyFiles     = "./dist/html/*.html";
// var prettifyFilesDist = "./dist/html";

// gulp.task('prettify', ['slm'], function(){
//   return gulp.src(prettifyFiles)
//     .pipe(prettify())
//     .pipe(gulp.dest(prettifyFilesDist));
// });


gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(slmFiles, ['slm']);
  var watchDirs = [
    './dist/html/*.html'
  ]
  gulp.watch(watchDirs).on('change', livereload.changed);
});

gulp.task('default', ['express', 'watch']);
