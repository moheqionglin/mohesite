/**
 * Created by zhouwanli on 16/03/2017.
 */
'use strict'
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');//当sass有各种引入关系时，编译后不容易找到对应less文件，所以需要生成sourcemap文件，方便修改
const compressCss = require('gulp-minify-css');//compress css plugin
const notify = require('gulp-notify');//log plugin
const plumber = require('gulp-plumber');//watch plugin
const imgmin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
var del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
var flatten = require('gulp-flatten');
var filter = require("gulp-filter");
var revReplace = require("gulp-rev-replace");
var cdnizer = require("gulp-cdnizer");
var ngmin = require('gulp-ng-annotate');
require('./gulpServer');

/********************CONST VAR***********************/
var gulpConfig = {
    scss: {
        source: './public/sass/main.scss',
        compile: './public/stylesheets/all',
        compress: './public/stylesheets',
        concatFileName: 'main.css',
        compressFileName: 'main.min.css',
        adminUI: {
            source: './public/sass/adminUI.scss',
            concatFileName: 'adminUI.main.css',
            compressFileName: 'adminUI.main.min.css'
        }
    },
    html: {
        source: './target/views/**/*.html',
        compress: './target/views/'
    },
    cdn: {
        cwd: './target/',
        url: 'http://cdn.moheqionglin.com'
    }

};
/********************GULP FUNCTION***********************/
//清空
gulp.task('clear-all', function(){
    return del.sync(['./public/stylesheets/**/*', './target/**'
    ])
});
//编译 sass 压缩 css
gulp.task('compile-compress-sass', function(){
    return gulp.src(gulpConfig.scss.source)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(gulpConfig.scss.compile))
        .pipe(concat(gulpConfig.scss.concatFileName))
        .pipe(gulp.dest(gulpConfig.scss.compress))
        .pipe(rename(gulpConfig.scss.compressFileName))
        .pipe(compressCss())
        .pipe(gulp.dest(gulpConfig.scss.compress));
});
gulp.task('local-css-adminUI', function(){
    return gulp.src([gulpConfig.scss.adminUI.source])
        .pipe(sass())
        .pipe(gulp.dest(gulpConfig.scss.compile))
        .pipe(concat(gulpConfig.scss.adminUI.concatFileName))
        .pipe(gulp.dest(gulpConfig.scss.compress))
        .pipe(rename(gulpConfig.scss.adminUI.compressFileName))
        .pipe(compressCss())
        .pipe(gulp.dest(gulpConfig.scss.compress));
});

//---------------------PROD function------------------------------
gulp.task('copy-views-to-target', ['compile-compress-sass'], function(){
    return gulp.src(['views/**/*', 'backend-app/**/*'], { "base" : "." })
        .pipe(gulp.dest('target/'));

});
gulp.task('copy-public-to-target', ['copy-views-to-target'], function(){
    return gulp.src(['./public/bower_components/**/*', './public/font/**/*', './public/images/**/*', './public/javascripts/**/*', './public/stylesheets/**/*'], { "base" : "./public" })
        .pipe(gulp.dest('target/'));

});

gulp.task('concat-compress-js-css-in-html', ['copy-public-to-target'], function () {
    return gulp.src(gulpConfig.html.source)
        .pipe(usemin({
            jsLibQstBlockList: [ngmin(), uglify()],
            jsLibQstDetail: [ngmin(), uglify()],
            jsLibQstList: [ngmin(), uglify()],
            jsLibQstNewQ: [ngmin(), uglify()],
            jsLibProfile: [ngmin(), uglify()],
            jsLibBlogDetails: [ngmin(), uglify()],
            jsLibBlogList: [ngmin(), uglify()],
            jsLibBookDetail: [ngmin(), uglify()],
            jsLibBookGrid: [ngmin(), uglify()],
            jsLibAbout: [ngmin(), uglify()],
            jsLibContact: [ngmin(), uglify()],
            jsLibSponsor: [ngmin(), uglify()],
            jsLibSerializeDetail: [ngmin(), uglify()],
            jsLibSerializeGrid: [ngmin(), uglify()],
            jsLibIndex: [ngmin(), uglify()],
            cssLibQstBlockList: [compressCss()],
            cssLibQstDetail: [compressCss()],
            cssLibQstList: [compressCss()],
            cssLibQstNewQ: [compressCss()],
            cssLibLogin: [compressCss()],
            cssLibProfile: [compressCss()],
            cssLibBlogDetails: [compressCss()],
            cssLibBlogList: [compressCss()],
            cssLibBookDetail: [compressCss()],
            cssLibBookGrid: [compressCss()],
            cssLibAbout: [compressCss()],
            cssLibContact: [compressCss()],
            cssLibSponsor: [compressCss()],
            cssLibSerializeDetail: [compressCss()],
            cssLibSerializeGrid: [compressCss()],
            cssLibIndex: [compressCss()]
        }))
        .pipe(gulp.dest(gulpConfig.html.compress));
});
gulp.task('css-js-md5', ['concat-compress-js-css-in-html'], function(){
    var cssFilter = filter('**/*.css', {restore: true});
    var jsFilter = filter('**/*.js', {restore: true});
    return gulp.src(['**/*.js', '**/*.css', '!bower_components', '**/*.html'], {cwd: gulpConfig.cdn.cwd})
        .pipe(jsFilter)
        .pipe(rev())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(rev())
        .pipe(cssFilter.restore)
        .pipe(revReplace({replaceInExtensions: ['.html']}));
});

gulp.task('cdn', ['css-js-md5'], function () {
    return gulp.src('**/*.html', {cwd: 'target/views'})
        .pipe(cdnizer({
            defaultCDNBase: gulpConfig.cdn.url ,
            relativeRoot: '/',
            files: [
                '**/*.js',
                '**/*.css'
            ]}
        ))
        .pipe(gulp.dest("target/views"));
});
gulp.task('move-to-public', ['cdn'], function(){
    return gulp.src(['./target/bower_components/**/*','./target/font/**/*',
        './target/images/**/*','./target/javascripts/**/*',
        './target/stylesheets/**/*'], { "base" : "./target" })
        .pipe(gulp.dest('./target/public/'));

});


gulp.task('delete-useless', ['move-to-public'], function(){
    return del.sync(
        ['./target/bower_components/**', './target/font/**', './target/images/**', './target/javascripts/**', './target/stylesheets/**']
    );
});
gulp.task('default', ['clear-all', 'compile-compress-sass', 'local-css-adminUI']);

gulp.task('prod', ['clear-all', 'delete-useless']);


