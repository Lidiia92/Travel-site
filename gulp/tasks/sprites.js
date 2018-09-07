/* It our job to tell gulp in this task to take all our icons and smush them into 1 file 

1. We need an actual gulp file so we are creating a gulp variable.
   1.1Then we need to download a package that will do a smoosh, dowload with npm.
npm install gulp-svg-sprite --save-dev

2.Then we create a new gulp task: first argument in a brackets is name of the task, second - is what we want a task actually do.
    2.1 Whenever we use gulp.src we need to use 'return' with it
    2.2 While files are travelling through the gulps pipe line we want them transform
    2.3 We are coping all svg files to a new DESTination using .pipe method
    
3. We can tell to generate a css properties for us, so css will figure out proprties which will allow us to use only one icon each time out of single multiple icons svg file

4.We want to create a new gulp task to copy sprites.css file to our modulus folder
    4.1 Before we copy it , we want to use npm package to rename the file
    4.2 This task in [] will have any tasks that it depends on
    
5.We are creating a new task that will combine two previous tasks

6.We are copying sprite graphics to the images folder

7. We are creating new task, which will remove old copy of sprite file after we generate a new one.
    7.1 We are giving a function passes to the folders we want to delete.
    7.2 We don't want createSprite task to start before we clean the old versions of files, so we list beginClean task as a dependency in our createSprite task. 
    
8.By the end of our task we dont need original copy of our sprite file /app/temp/sprite, so we are creating a task to delete it in the end of the tasks sequances. 

10.New task to create a PNG copy of SVG file. 
*/
 
/* 1 */
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');


/* 3 */
var config = {
  shape: {
      spacing: {
          padding: 1
      }
  },
  mode: {
    css: {
      variables: {
          replaceSvgWithPng: function() {
              return function(sprite, render) {
                  return render(sprite).split('.svg').join('.png');
              }
          }
      },
      sprite: 'sprite.svg', //removes .css from the svg file name
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

/* 7 */
gulp.task('beginClean', function(){
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

/* 2 */
gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

/* 10 */
gulp.task('createPngCopy', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

/* 6 */
gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});


/* 4 */
gulp.task('copySpriteCSS', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

/* 8 */
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
    return del('./app/temp/sprite');
});


/* 5 */
gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);