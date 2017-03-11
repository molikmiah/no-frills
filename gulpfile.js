// require gulp packages
var gulp  = require('gulp'),
    chalk = require('chalk'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    del = require('del'),
    ts = require("gulp-typescript");

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
var buildSourceOnly = [
  './src/core.router.ts',
  './src/core.template-engine.ts',
  './src/core.constructors.ts'
];

var dependenciesSource = './node_modules/mustache/mustache.js';
var tempFolder = './temp/';
var compiledTstoJsFiles = './temp/**/*';
var licenses = ['./LICENSE.md'];
var buildDestination = './build/';

// create a default task
gulp.task('default', function() {
  emptyLines();
  console.log(text.brandBold('no-frills.js'));
  console.log(text.brand('Copyright (c) 2017 Molik Miah. MIT license.'));
  emptyLines(2);
  console.log(chalk.inverse('Available Commands:'));
  console.log('gulp build');
  console.log('gulp compile-typescript');
  emptyLines(2);
});

// build task
gulp.task('build', ['clean', 'clean-tmp', 'copy-license', 'compile-typescript'], function() {
  emptyLines();
  console.log(text.brandBold('no-frills.js'));
  console.log(text.brand('Copyright (c) 2017 Molik Miah. MIT license.'));
  emptyLines(2);
  console.log(chalk.inverse('Building framework for distribution...'));
  emptyLines(2);

  console.log(text.buildTxt('Concatenating source files for distribution...'));

  // concat all required files in order
  gulp.src([dependenciesSource, compiledTstoJsFiles])
      .pipe(concat('no-frills.js'))
      .pipe(gulp.dest(buildDestination))
      .pipe(minify())
      .pipe(gulp.dest(buildDestination));

  del(tempFolder);

  emptyLines(2);
  console.log(chalk.inverse('Build finished.'));
  console.log(text.buildTxt('Files can be found at ' + buildDestination));
  emptyLines(2);
});

// clean up folders
gulp.task('clean', function() {
  console.log(text.buildTxt('Cleaning out the build folder...'));
  return del(buildDestination + '**.*');
});

gulp.task('clean-tmp', function() {
  console.log(text.buildTxt('Cleaning out the temp folder...'));
  return del(tempFolder);
});

// typescript compiler
gulp.task('compile-typescript', function() {
  console.log(text.buildTxt('Compiling TypeScript to JavaScript src files...'));

  return gulp.src(buildSourceOnly)
             .pipe(ts({
                 noImplicitAny: true,
                 out: 'output.js'
             }))
             .pipe(gulp.dest(tempFolder));
});

// copy license file into build directory, as required for distribution
gulp.task('copy-license', function() {
  console.log(text.buildTxt('Copying relevant license files into the build directory.'));

  return gulp.src(licenses)
      .pipe(gulp.dest(buildDestination));
});