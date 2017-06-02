var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.+(scss|sass)')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions',
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: true
        }))
        .pipe(gulp.dest('public/css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'));
});


gulp.task('js-watch', ['sass'], function() {
    return gulp.src('src/js/*.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('public/js'))
});


gulp.task('build', ['js-watch'], function () {
    gulp.src('src/+(fonts|img)/**/*.*')
        .pipe(gulp.dest('public/'))
});


gulp.task('watch', ['sass'], function () {
    gulp.watch('./src/sass/**/*.+(scss|sass)', ['sass']);
});
