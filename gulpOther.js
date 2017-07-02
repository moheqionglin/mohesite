/**
 * Created by zhouwanli on 02/07/2017.
 */
'use strict';
var gulpConfig = {
    image: {
        source: './public/images/!(dist)**/*',
        compressForLocal: './public/images/dist',
        compressForProd: './target/public/images'
    },
    html: {
        source: './views/**/*.html',
        compress: './target/views'
    },
    js: {
        source: './public/javascripts/**/*.js',
        compressDirForProd: './target/public/javascripts',
        compressDirForLocal: './public/javascripts',
        concatFileName: 'all.js',
        compressFileName: 'all.min.js'

    }
};
//JS 语法检查 压缩合并
gulp.task('js-hint', function(){
    return gulp.src(gulpConfig.js.source)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('compress-concat-js', function(){
    return gulp.src(gulpConfig.js.source)
        .pipe(concat(gulpConfig.js.concatFileName))
        .pipe(gulp.dest(gulpConfig.js.compressDirForProd))
        .pipe(rename(gulpConfig.js.compressFileName))
        .pipe(uglify())
        .pipe(gulp.dest(gulpConfig.js.compressDirForProd));
});
gulp.task('local-js', function(){
    return gulp.src(gulpConfig.js.source)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat(gulpConfig.js.concatFileName))
        .pipe(gulp.dest(gulpConfig.js.compressDirForLocal))
        .pipe(rename(gulpConfig.js.compressFileName))
        .pipe(uglify())
        .pipe(gulp.dest(gulpConfig.js.compressDirForLocal));
});

/********************GULP FUNCTION***********************/
//压缩图片
gulp.task('compress-img', function(){
    return gulp.src(gulpConfig.image.source)
        .pipe(imgmin())
        .pipe(gulp.dest(gulpConfig.image.compressForProd));
});
gulp.task('local-img', function(){
    return gulp.src(gulpConfig.image.source)
        .pipe(imgmin())
        .pipe(gulp.dest(gulpConfig.image.compressForLocal));

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
    return gulp.src(gulpConfig.html.source)
        .pipe(htmlmin(htmlParams))
        .pipe(gulp.dest(gulpConfig.html.compress));
});
