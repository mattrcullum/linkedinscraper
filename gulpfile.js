/**
 * Created by matthew on 12/31/14.
 */

// modules
var gulp = require('gulp');
var transform = require('vinyl-transform');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');

var scripts = ['app/scripts/content/*', 'app/scripts/background/*', 'app/scripts/app/*'];
var mainFiles = ['app/scripts/content/content.js', 'app/scripts/background/background.js', 'app/scripts/app/app.js'];

gulp.task('concat', function () {

    var dest = 'app/scripts/static/';

    var browserified = transform(function (filename) {

        var file = filename;
        var b = concat(filename, {
            debug: true
        });
        // you can now further configure/manipulate your bundle
        // you can perform transforms, for e.g.: 'coffeeify'
        // b.transform('coffeeify');
        // or even use concat plugins, for e.g. 'minifyiy'
        // b.plugins('minifyify');
        // consult concat documentation at: https://github.com/substack/node-concat#methods for more available APIs
        return b.bundle();
    });


    var folders = ['app/scripts/app/*', 'app/scripts/background/*', 'app/scripts/content/*'];
    var outputs = ['app.js', 'background.js', 'content.js'];

    folders.forEach(function (input, index) {
        return gulp.src(['app/scripts/helpers/*', input])
            .pipe(concat(outputs[index]))
            .pipe(coffee())
            .pipe(gulp.dest(dest));
    });
});


gulp.task('js2coffee', function () {
    var folders = ['app/scripts/app/*', 'app/scripts/background/*', 'app/scripts/content/*', 'app/scripts/helpers/*'];
    var outputs = ['app/scripts/app/', 'app/scripts/background/', 'app/scripts/content', 'app/scripts/helpers/'];

    folders.forEach(function (input, index) {
        return gulp.src(input)
            .pipe(js2coffee())
            .pipe(gulp.dest(outputs[index]))
    })
});


gulp.task('watch', function () {
    gulp.watch(scripts, ['concat'])
});

gulp.task('default', ['concat', 'watch']);
