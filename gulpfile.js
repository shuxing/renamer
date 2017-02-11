'use strict';

const gulp = require('gulp');
const changed = require('gulp-changed');
const ts = require('gulp-typescript');
const shell = require('gulp-shell');
const Builder = require("systemjs-builder");

const tsProject = ts.createProject('tsconfig.json');

const paths = {
    tsFiles: ['src/app/**/*.ts'],
    htmlFiles: ['src/**/*.html'],
    jsFiles: ['src/**/*.js'],
    dest: 'dist',
    appDest: 'dist/app'
};

gulp.task("rxjs", () => {
    var builder = new Builder('./node_modules');

    builder.config({
        paths: {"rxjs/*": "rxjs/*.js"},
        map: { "rxjs": "rxjs" },
        packages: { "rxjs": { main: 'Rx.js', defaultExtension: "js" } }
    });

    builder.bundle('rxjs', 'dist/bundles/Rx.min.js', {
        sourceMaps: false,
        minify: true,
        mangle: true
    });
});

gulp.task('ts', _ => {
    var tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(paths.appDest));
});

gulp.task('html', _ => {
    return gulp.src(paths.htmlFiles).pipe(changed(paths.dest)).pipe(gulp.dest(paths.dest));
});

gulp.task('js', _ => {
    return gulp.src(paths.jsFiles).pipe(changed(paths.dest)).pipe(gulp.dest(paths.dest));
});

gulp.task('watch', ['html', 'js', 'ts'], function() {
    gulp.watch(paths.htmlFiles, ['html']);
    gulp.watch(paths.jsFiles, ['js']);
    gulp.watch(paths.tsFiles, ['ts']);
});

gulp.task('start', shell.task('npm start'));

gulp.task('serve', ['watch', 'start']);

gulp.task('default', ['serve']);
