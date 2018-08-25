var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();



gulp.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir:"app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    browserSync.reload();
    gulp.start('cssInject');

    /*diese Funktion aus dem Netz, BrowserSync soll auch reloaded bei Änderungen/undos aus .css Files*/
  });

   watch('./app/assets/scripts/**/*.js', function () {
     gulp.start('scriptsRefresh');
   }) 
  
});


gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
  .pipe(browserSync.stream());
  
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});

