var gulp = require('gulp'),
modernizr = require('gulp-modernizr');


//we need src of the file
//then we want to pipe it through modernizr
//the we want tp push it to the destination
gulp.task('modernizr', function() {
    return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
        .pipe(modernizr({
          'options': [
              'setClasses'
          ]
    }))
        .pipe(gulp.dest('./app/temp/scripts'));
});