'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('serve', function () {
    // Start browser process 
    electron.start();

    // Restart browser process 
    gulp.watch('src/main/index.js', electron.restart);

    // Reload renderer process 
    gulp.watch(['src/app/**/*.js', 'src/app/**/*.css'], electron.reload);
});

gulp.task('default', ['serve']);
