/* eslint-disable */

module.exports = function(gulp, config) {
    const path = require('path');
    const browserify = require('browserify');
    const babelify = require('babelify');
    const uglify = require('gulp-uglify');
    const gulpif = require('gulp-if');
    const sourcemaps = require('gulp-sourcemaps');
    const rename = require('gulp-rename');
    const source = require('vinyl-source-stream');
    const buffer = require('vinyl-buffer');
    const cli = require('../cli');
    const OPTIONS = config;

    const buildScripts = () => browserify({
            entries: OPTIONS.FILE.JS_ENTRY_CLIENT,
            extensions: ['.js'],
            debug: true
        })
        .transform(babelify, {
            presets: ['es2015', 'react', 'stage-0']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulpif(cli.argv.isProd, uglify({
            mangle: false
        })))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(OPTIONS.DIR.DIST_SCRIPTS_CLIENT));

    const buildServer = () => gulp.src([path.join(OPTIONS.DIR.SRC_SCRIPTS_SERVER, '**/*.js')])
        .pipe(gulp.dest(OPTIONS.DIR.DIST_SCRIPTS_SERVER));

    gulp.task('build:scripts', gulp.series(buildScripts));
    gulp.task('build:server', gulp.series(buildServer));
    gulp.task('watch:scripts', () => {
        gulp.watch(OPTIONS.GLOB.JS).on('change', () => buildScripts());
    });
};
