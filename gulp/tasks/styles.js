var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'), //adds prefixes for us to the items that need them 
cssvars = require('postcss-simple-vars'), //uses vars values
nested = require('postcss-nested'),//we can nest our custom css file
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

/* We want to move contents of this file to a pipe so we can do something 
We also create a pipe where we will take our stylesheet through PostCss filters.
We are creating .on method which will handle when the error occures watch task will not stop running.
*/

gulp.task('styles', function(){
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
        .on('error', function(errorInfo){
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles/'));
});