/* We are importing our styles.js and watch.js files. When you use reqire function you dont need to include .js*/

require('./gulp/tasks/styles');
require('./gulp/tasks/watch');








/* --We are creating a task with name default, second argument is - what we want to happen when this task runs

gulp.task('default', function(){
    console.log('Hooray-you created a task');
});

-- To run a default file just type gulp, other files: type gulp name of the file 

gulp.task('html', function(){
    console.log('Text in your html file');
});


*/