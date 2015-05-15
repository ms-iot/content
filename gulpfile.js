var gulp = require('gulp');
var config = require('./gulp.config')();
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var shell = require('gulp-shell');
var del = require('del');

var basePath = '{{site.baseurl}}';

//deletes existing minified css file
gulp.task('clean-styles', function(done) {
    var files = config.minCss;
    del(config.minCss, done);
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
    return gulp
        .src(config.allJs)
        .pipe(uglify())
        .pipe(concat('all.min.js'))
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
    gulp.watch([config.allJs], ['inject-js']);
});

//runs everything
gulp.task('run', ['inject-js', 'inject-css'], function() {
    console.log('Done');
})

