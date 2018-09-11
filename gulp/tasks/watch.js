/* We are importing a gulp library into our file and plugins*/

var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

/* 1. We are setting up for which of files we want to watch for changes 
   2. Its a file in our app folder(./ to go to the root directory)
   3. Function is  what we want this file actually do: When we save the changes to the watch task we will trigger our html task
   4. Gulp watch task doesnt end until we tell it to end
   5. Anytime we save this index.html file gulp will run html task in a command line
   6. To stop watching press ctrl + C 
   7. We are creating another watch task for the any css files in the assets folder and in any future folders inside styles folder(**) 
   8.We are adding our browserSync var which will refresh our browser when we save changes to our files
   We should tell browser-sync where our website lives, because browser-sync spins up a little server on our computer.And it needs to know where that webserver should point
   9.When we save the changes to our html index file, we want our browser-sync to reload
   */


gulp.task('watch', function(){
    
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });
    
    watch('./app/index.html', function(){
        browserSync.reload();
    });
    watch('./app/assets/styles/**/*.css', function(){
        gulp.start('cssInject');
    });
    
    //Any changes to our js files
    watch('./app/assets/scripts/**/*.js', function() {
        gulp.start('scriptsRefresh'); 
    });
});

/* 1.We are creating a new task, which will inject our the latest css changes to our page, without refreshing the browser 
2.Gulp.src isnt sync function, so we have to include a return in the beginning of the line
3.We are adding a dependency task which is a dependency of cssInject task
*/

gulp.task('cssInject', ['styles'], function(){
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
});