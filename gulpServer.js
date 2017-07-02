/**
 * Created by zhouwanli on 01/07/2017.
 */
'use strict';
const browserSync = require('browser-sync').create();
const gulp = require('gulp');

//启动服务器
gulp.task('serve-prod', function(){
    browserSync.init({
        server: {
            baseDir: 'target/views'
        }
    });

    gulp.watch([gulpConfig.image.source, gulpConfig.html.source, gulpConfig.js.source, gulpConfig.scss.source], function(){
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

    gulp.watch([gulpConfig.image.source, gulpConfig.html.source, gulpConfig.js.source], function(){
        browserSync.reload();
    });
});