/* We are importing a gulp library into our file and plugins*/

var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'), //adds prefixes for us to the items that need them
cssvars = require('postcss-simple-vars'), //uses vars values
nested = require('postcss-nested'),//we can nest our custom css file
cssImport = require('postcss-import');

/* We are creating a task with name default, second argument is - what we want to happen when this task runs*/

gulp.task('default', function(){
    console.log('Hooray-you created a task');
});

/* To run a default file just type gulp, other files: type gulp name of the file */

gulp.task('html', function(){
    console.log('Text in your html file');
});

/* We want to move contents of this file to a pipe so we can do something 
We also create a pipe where we will take our stylesheet through PostCss filters.
*/

gulp.task('styles', function(){
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles/'));
});

/* 1. We are setting up for wchich of files we want to watch for chages 
   2. Its a file in our app folder(./ to go to the root directory)
   3. Function is  what we want this file actually do: When we save the changes to the watch task we will trigger our html task
   4. Gulp watch task doesnt end until we tell it to end
   5. Anytime we save this index.html file gulp will run html task in a command line
   6. To stop watching press ctrl + C 
   7. We are creating another watch task for the any css files in the assets folder and in any future folders inside styles folder(**) */


gulp.task('watch', function(){
    watch('./app/index.html', function(){
        gulp.start('html');
    });
    watch('./app/assets/styles/**/*.css', function(){
        gulp.start('styles');
    });
});