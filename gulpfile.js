// require gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    del = require('del');

// text styling used in console output
var text = {
  error: chalk.bold.red,
  brandBold: chalk.bold.blue,
  brand: chalk.blue,
  buildTxt: chalk.green
};

// generates an empty line in the console via a console log
// optional `number` can be specified for the number of lines required
function emptyLines(number) {
  if (typeof number !== 'undefined') {
    for (i = 1; i <= number; i++) {
      console.log(' ');
    }
  }
  else {
    console.log(' ');
  }
}

// source files for build
var buildSource = ['./src/core.router.js', './src/core.template-engine.js', './src/core.constructors.js'];

// create a default task
gulp.task('default', function() {
  emptyLines();
  console.log(text.brandBold('no-frills.js'));
  console.log(text.brand('Copyright (c) 2017 Molik Miah. MIT license.'));
  emptyLines(2);
  console.log(chalk.inverse('Available Commands:'));
  console.log('gulp build');
  emptyLines(2);
});

// build task
gulp.task('build', ['clean'], function() {
  emptyLines();
  console.log(text.brandBold('no-frills.js'));
  console.log(text.brand('Copyright (c) 2017 Molik Miah. MIT license.'));
  emptyLines(2);
  console.log(chalk.inverse('Building framework for distribution...'));
  emptyLines(2);

  console.log(text.buildTxt('concatenating source files for distribution...'));
  // concat all required files in order
  gulp.src(buildSource)
    .pipe(concat('no-frills.js'))
    .pipe(gulp.dest('./build/'))
    .pipe(minify())
    .pipe(gulp.dest('./build/'));

  emptyLines(2);
  console.log(text.buildTxt('Build finished.'));
  console.log(text.buildTxt('Files can be found at ./build/'));
  emptyLines(2);
});

// clean build folder
gulp.task('clean', function() {
  console.log(text.buildTxt('Cleaning out the build folder...'));
  del('./build/**.*');
});