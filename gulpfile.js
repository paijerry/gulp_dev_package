const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer'); // 讓uglify支援stream
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const cache = require('gulp-cache');
const del = require('del');
const lec = require('gulp-line-ending-corrector');
const plumber = require('gulp-plumber'); // 噴錯不中斷處理
const notify = require('gulp-notify');
const gulpWebpack = require('gulp-webpack');
const gutil = require('gulp-util'); // 提供不執行的動作
const browserSync = require('browser-sync').create();

const isDevelopment = (process.env.NODE_ENV === 'development');
const webpackConfig = require('./webpack.config');
const myPath = require('./config/myPath');

const devTasks = ['browser-sync', 'watch'];
const buildTasks = ['to-html', 'to-css', 'webpack', 'sync-scripts', 'sync-images'];
const runTasks = (isDevelopment) ? buildTasks.concat(devTasks) : buildTasks;

// Pug to Html
gulp.task('to-html', () => {
  gulp.src(myPath.fileType.pug.files)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest(myPath.fileType.pug.output))
    .pipe(browserSync.reload({ stream: true }));
});

// Scss to Css
gulp.task('to-css', () => {
  gulp.src(myPath.fileType.scss.files)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sass({
      indentedSyntax: true,
      includePaths: [
        './node_modules/susy/sass', //required for sass
      ],
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(lec({ verbose: true, eolc: 'LF', encoding: 'utf8' }))
    .pipe((isDevelopment) ? gutil.noop() : cleanCSS({ keepBreaks: true }))
    .pipe(rename({
      suffix: '.min',
      extname: '.css',
    }))
    .pipe(gulp.dest(myPath.fileType.scss.output))
    .pipe(browserSync.reload({ stream: true }));
});

// Script
gulp.task('webpack', () => {
  gulp.src(myPath.fileType.script.files)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulpWebpack(webpackConfig))
    .pipe(babel())
    .pipe(gulp.dest(myPath.fileType.script.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('sync-scripts', () => {
  gulp.src(myPath.fileType.script.plugins)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe((isDevelopment) ? gutil.noop() : buffer())
    .pipe((isDevelopment) ? gutil.noop() : uglify())
    .pipe(babel())
    .pipe(gulp.dest(myPath.fileType.script.output))
    .pipe(browserSync.reload({ stream: true }));
});

// Sync Images
gulp.task('sync-images', () => {
  gulp.src(myPath.fileType.image.files)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(myPath.fileType.image.output))
    .pipe(browserSync.reload({ stream: true }));
});

// Clean before Compiler
gulp.task('clean', () => {
  return del(`${myPath.root.dest}/**/*`);
});

// Watch
gulp.task('watch', () => {
  // Watch files
  gulp.watch(myPath.fileType.pug.watch_files, ['to-html']);
  gulp.watch(myPath.fileType.scss.watch_files, ['to-css']);
  gulp.watch(myPath.fileType.script.watch_files, ['webpack']);
  gulp.watch(myPath.fileType.image.watch_files, ['sync-images']);
});

// browser Sync
gulp.task('browser-sync', () => {
  return browserSync.init({
    open: false,
    server: {
      baseDir: myPath.root.dest,
    },
  });
});

// Default
gulp.task('default', ['clean'], () => {
  gulp.start(runTasks);
});
