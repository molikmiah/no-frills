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
var buildSourceOnly = [
  './node_modules/mustache/mustache.js',
  './src/core.router.js',
  './src/core.template-engine.js',
  './src/core.constructors.js'
];

var buildSourceWithDependencies = [
  './node_modules/mustache/mustache.js',
  './src/core.router.js',
  './src/core.template-engine.js',
  './src/core.constructors.js'
];

var dependenciesSource = './node_modules/mustache/mustache.js';

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
  if (process.argv.includes('--include=dependencies')) {
    console.log(text.buildTxt('All 3rd party dependencies are included with the build files: no-frills.js / no-frills-min.js'));

    gulp.src(buildSourceWithDependencies)
      .pipe(concat('no-frills.js'))
      .pipe(gulp.dest('./build/'))
      .pipe(minify())
      .pipe(gulp.dest('./build/'));
  }
  else {
    gulp.src(buildSourceOnly)
      .pipe(concat('no-frills.js'))
      .pipe(gulp.dest('./build/'))
      .pipe(minify())
      .pipe(gulp.dest('./build/'));

    gulp.src(dependenciesSource)
      .pipe(concat('no-frills-dependencies.js'))
      .pipe(gulp.dest('./build/'))
      .pipe(minify())
      .pipe(gulp.dest('./build/'));

    console.log(text.buildTxt('Please include no-frills-dependencies.js in your project as these will be dependencies of this framework.'));
    console.log(text.buildTxt(' no-frills-dependencies.js is required before no-frills.js / no-frills.min,js'));
    emptyLines();
    console.log(text.buildTxt('If you want all dependencies bundled in with the built framework .js files then please run the following command:'));
    console.log('gulp build --include=dependencies');
  }

  emptyLines(2);
  console.log(chalk.inverse('Build finished.'));
  console.log(text.buildTxt('Files can be found at ./build/'));
  console.log(text.buildTxt('Please use *-min.js files for production builds of your web-app.'));
  emptyLines(2);

  if (process.argv.includes('--include=dependencies')) {
    console.log('hey molik');
  }
});

// clean build folder
gulp.task('clean', function() {
  console.log(text.buildTxt('Cleaning out the build folder...'));
  del('./build/**.*');
});