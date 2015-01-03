/**
 * Created by matthew on 12/31/14.
 */
var gulp = require('gulp');

gulp.task('default', function() {
    // place code for your default task here
});

var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});