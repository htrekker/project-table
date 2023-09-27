const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-cssmin');

/*
  -- TOP LEVEL --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/


async function compile() {
    await gulp.src('./src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('./lib'));
};

async function fonts() {
    await gulp.src('./fonts/*')
          .pipe(cssmin())
          .pipe(gulp.dest('./lib/fonts'));
};

exports.build = gulp.series(compile, fonts);