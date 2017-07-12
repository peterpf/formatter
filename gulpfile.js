let gulp = require('gulp');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let cleanCss = require('gulp-clean-css');
let runSequence = require('run-sequence');
let cleanc = require('gulp-clean');
let htmlmin = require('gulp-htmlmin');

var jsFiles = [
    'node_modules/@material/textfield/dist/mdc.textfield.min.js',
    'node_modules/@material/ripple/dist/mdc.ripple.min.js',
    'js/main.js',
    'js/example_data.js'
];
var styleFiles = [
    'node_modules/@material/ripple/dist/mdc.ripple.min.css',
    'node_modules/@material/button/dist/mdc.button.min.css',
    'node_modules/@material/textfield/dist/mdc.textfield.min.css',
    'node_modules/@material/layout-grid/dist/mdc.layout-grid.min.css',
];
var htmlFiles = './*.html';

var destination = 'dist/';

gulp.task('minify-css', function(){
    return gulp.src(styleFiles)
        .pipe(concat('styles.css'))
        //.pipe(gulp.dest(destination))
        .pipe(rename('styles.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest(destination));
});

gulp.task('minify-js', function(){
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        //.pipe(gulp.dest(destination))
        .pipe(rename('scripts.min.js'))
        .pipe(cleanc())
        .pipe(gulp.dest(destination));
});

gulp.task('minify-html', function(){
    return gulp.src(htmlFiles)
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(destination));
});

gulp.task('build', function(callback){
    runSequence(
        'minify-css',
        'minify-js',
        'minify-html',
        callback
    );
});

gulp.task('build-docs', function(callback){
    destination = 'docs/';
    runSequence('build', callback);
});
