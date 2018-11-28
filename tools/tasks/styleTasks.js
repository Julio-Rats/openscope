/* eslint-disable */
'use strict';

module.exports = function(gulp, config) {
    const less = require('gulp-less');
    const sourcemaps = require('gulp-sourcemaps');
    const cleanCSS = require('gulp-clean-css');
    const concat = require('gulp-concat');
    const autoprefixer = require('gulp-autoprefixer');

    const OPTIONS = config;

    const buildStyles = () => gulp.src(OPTIONS.FILE.CSS_MAIN)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie11'}))
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(OPTIONS.DIR.DIST_STYLE));

    gulp.task('build:styles', gulp.series(buildStyles));

    gulp.task('watch:styles', () => {
        gulp.watch(OPTIONS.GLOB.LESS).on('change', () => buildStyles());
    });
};
