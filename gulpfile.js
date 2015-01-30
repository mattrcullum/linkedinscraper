/**
 * Created by matthew on 12/31/14.
 */

// modules
var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');

var scripts = ['app/scripts/content/*', 'app/scripts/background/*', 'app/scripts/app/*'];
var mainFiles = ['app/scripts/content/content.js', 'app/scripts/background/background.js', 'app/scripts/app/app.js'];

gulp.task('browserify', function () {

    var dest = 'app/scripts/static/';

    var browserified = transform(function (filename) {

        var file = filename;
        var b = browserify(filename, {
            debug: true
        });
        // you can now further configure/manipulate your bundle
        // you can perform transforms, for e.g.: 'coffeeify'
        // b.transform('coffeeify');
        // or even use browserify plugins, for e.g. 'minifyiy'
        // b.plugins('minifyify');
        // consult browserify documentation at: https://github.com/substack/node-browserify#methods for more available APIs
        return b.bundle();
    });

    return gulp.src(mainFiles)
        .pipe(browserified)
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function () {
    gulp.watch(scripts, ['browserify'])
});

gulp.task('default', ['browserify', 'watch']);
