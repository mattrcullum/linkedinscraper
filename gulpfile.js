/**
 * Created by matthew on 12/31/14.
 */
var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('build', function() {

});

var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});