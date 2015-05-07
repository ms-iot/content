var gulp = require('gulp');
var config = require('./gulp.config')();
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var shell = require('gulp-shell');
var del = require('del');

var basePath = '{{site.baseurl}}';

//deletes existing minified css file
gulp.task('clean-styles', function(done) {
    var files = config.minCss;
    clean(files, done);
});
//minifies and concats main and nav css
gulp.task('minify-concat', ['clean-styles'], function() {
    return gulp
        .src(config.allCss)
        .pipe(minifyCss())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest(config.css));
});
//concats js
gulp.task('concat-js', function() {
    var allJS = config.venderJs.concat(config.appJs);
    return gulp
        .src(allJS)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(config.js));
});
//injects minified and concatinated css into head
gulp.task('inject-css', ['minify-concat'], function() {
    return gulp
        .src('./_includes/head.html')
        .pipe(inject(gulp.src(config.minCss, {read: false}), {addPrefix: basePath, addRootSlash: false}))
        .pipe(gulp.dest('./_includes'));
});
//injects js into footer
gulp.task('inject-js', ['concat-js'], function() {
    return gulp
        .src('./_includes/footer.html')
        .pipe(inject(gulp.src(config.minJs, {read: false}), {addPrefix: basePath, addRootSlash: false}))
        .pipe(gulp.dest('./_includes'));
});
//watches for changes and calls approprate task
gulp.task('watch', function() {
    gulp.watch([config.allCss], ['inject-css']);
    gulp.watch([config.venderJs, config.appJs], ['inject-js']);
    // gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '*.md', 'win8/*', 'win10/*'], ['serve']);
});



// gulp.task('serve', shell.task([
//     'bundle exec jekyll serve'
// ]));

function clean(path, done) {
    del(path, done);
}
