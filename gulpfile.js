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
const browserSync = require('browser-sync').create();
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
/********************CONST VAR***********************/
//IMAGE
const sourceImgDir = './public/images/!(dist)**/*' ;
const compressImgDir = './target/public/images';

const localCompressImgDir = './public/images/dist';
//HTML
const sourceHtml = './views/**/*.html';
const compressHtml = './target/views';
//JS
const sourceJS = './public/javascripts/**/*.js';
const compressJSDir = './target/public/javascripts';
const concatJSFileName = 'all.js';
const compressJSFileName = 'all.min.js';

const localCompressJSDir = './public/javascripts';
//SCSS
const sourceSass = './public/sass/main.scss';
const compileCssDir = './target/public/stylesheets/all';
const compressCssDir = './target/public/stylesheets';
const concatCssFileName = 'main.css';
const compressCssFileName = 'main.min.css';
const adminUISourceSass = './public/sass/adminUI.scss';
const adminUIConcatCssFileName = 'adminUI.main.css';
const adminUICompressCssFileName = 'adminUI.main.min.css';

const localCompileCssDir = './public/stylesheets/all';
const localCompressCssDir = './public/stylesheets';
/********************GULP FUNCTION***********************/
//压缩图片
gulp.task('compress-img', function(){
    return gulp.src(sourceImgDir)
        .pipe(imgmin())
        .pipe(gulp.dest(compressImgDir));
});
gulp.task('local-img', function(){
    return gulp.src(sourceImgDir)
        .pipe(imgmin())
        .pipe(gulp.dest(localCompressImgDir));

});
//压缩html
const htmlParams = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
};
gulp.task('compile-html', function(){
    return gulp.src(sourceHtml)
        .pipe(htmlmin(htmlParams))
        .pipe(gulp.dest(compressHtml));
});

//JS 语法检查 压缩合并
gulp.task('js-hint', function(){
    return gulp.src(sourceJS)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
gulp.task('compress-concat-js', function(){
    return gulp.src(sourceJS)
        .pipe(concat(concatJSFileName))
        .pipe(gulp.dest(compressJSDir))
        .pipe(rename(compressJSFileName))
        .pipe(uglify())
        .pipe(gulp.dest(compressJSDir));
});
gulp.task('local-js', function(){
    return gulp.src(sourceJS)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat(concatJSFileName))
        .pipe(gulp.dest(localCompressJSDir))
        .pipe(rename(compressJSFileName))
        .pipe(uglify())
        .pipe(gulp.dest(localCompressJSDir));
});

//编译 sass 压缩 css
gulp.task('compile-sass', function(){
    return gulp.src(sourceSass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(compileCssDir));
});
gulp.task('compress-css', function(){
    return gulp.src(compileCssDir)
        .pipe(concat(concatCssFileName))
        .pipe(gulp.dest(compressCssDir))
        .pipe(rename(compressCssFileName))
        .pipe(compressCss())
        .pipe(gulp.dest(compressCssDir));
});
gulp.task('local-css', function(){
    return gulp.src(sourceSass)
        .pipe(sass())
        .pipe(gulp.dest(localCompileCssDir))
        .pipe(concat(concatCssFileName))
        .pipe(gulp.dest(localCompressCssDir))
        .pipe(rename(compressCssFileName))
        .pipe(compressCss())
        .pipe(gulp.dest(localCompressCssDir));
});
gulp.task('local-css-adminUI', function(){
    return gulp.src([adminUISourceSass])
        .pipe(sass())
        .pipe(gulp.dest(localCompileCssDir))
        .pipe(concat(adminUIConcatCssFileName))
        .pipe(gulp.dest(localCompressCssDir))
        .pipe(rename(adminUICompressCssFileName))
        .pipe(compressCss())
        .pipe(gulp.dest(localCompressCssDir));
});



//启动服务器
gulp.task('serve-prod', function(){
    browserSync.init({
        server: {
            baseDir: 'target/views'
        }
    });

    gulp.watch([sourceImgDir, sourceHtml, sourceJS, sourceSass], function(){
        gulp.run('js-hint',
            'compress-concat-js',
            'compile-sass',
            'compress-css',
            'compress-img',
            'compile-html');
        browserSync.reload();
    });
});
gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: ["views", "."],
            index: "index.html",
            middleware: [
                function (req, res, next) {
                    console.log("Hi from first middleware");
                    next();
                },
                function (req, res, next) {
                    console.log("Hi from the second middleware");
                    next();
                }
            ]
        },
        port: 9999,
        browser: ["google chrome", "firefox"],
    });

        gulp.watch([sourceImgDir, sourceHtml, sourceJS], function(){
        browserSync.reload();
    });
});

gulp.task('default', function(){
    gulp.run('js-hint',
        // 'local-js',
        'local-css',
        'local-css-adminUI'
        // 'local-img'
    );
});

gulp.task('prod', function(){
    gulp.run('js-hint',
        'compress-concat-js',
        'compile-sass',
        'compress-css',
        'compress-img',
        'compile-html');
});


