import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import { deleteAsync } from 'del';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import webp from 'gulp-webp';
import responsive from 'gulp-sharp-responsive';
import newer from "gulp-newer";

const sass = gulpSass(dartSass);
const bs = browserSync.create();

const paths = {
  html: {
    src: 'src/pages/**/*.html',
    dest: 'dist/',
    watch: ['src/pages/**/*.html', 'src/components/**/*.html'],
  },
  styles: {
    src: 'src/scss/main.scss',
    dest: 'dist/assets/css/',
    watch: 'src/scss/**/*.scss',
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/',
    watch: 'src/js/**/*.js',
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets/',
  },
  images: {
    src: 'src/images/**/*{.jpg,.jpeg,.png}',
    dest: 'dist/assets/images',
  },
  svg: {
    src: 'src/images/**/*.svg',
    dest: 'dist/assets/images'
  }
};

export const html = () =>
  gulp
    .src(paths.html.src)
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: 'src/components/',
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: false,
        removeComments: true,
      })
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(bs.stream());

export const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream());

export const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest))
    .pipe(bs.stream());

export const svg = () =>
  gulp
    .src(paths.svg.src)
    .pipe(gulp.dest(paths.svg.dest));

const imagesToWebp = () =>
  gulp.src(paths.images.src, { encoding: false })
    .pipe(newer(paths.images.dest))
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest(paths.images.dest));

const imagesToMobileWebp = () =>
  gulp.src(paths.images.src, { encoding: false })
    .pipe(responsive({
      formats: [
        { width: 480, rename: { suffix: "-sm" }, format: 'webp' },
        { width: 800, rename: { suffix: "-lg" }, format: 'webp' },
      ]
    }))
    .pipe(gulp.dest(paths.images.dest));

export const assets = () =>
  gulp.src(paths.assets.src, { encoding: false }).pipe(gulp.dest(paths.assets.dest));

export const clean = () => deleteAsync(['dist']);

export const serve = () => {
  bs.init({
    server: {
      baseDir: './dist',
    },
    notify: false,
    open: true,
    cors: true,
  });

  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.html.watch, html);
  gulp.watch(paths.js.watch, js);
  gulp.watch(paths.assets.src, assets);
  gulp.watch(paths.images.src, imagesToWebp);
  gulp.watch(paths.images.src, imagesToMobileWebp);
  gulp.watch(paths.svg.src, svg);
};

export const build = gulp.series(
  clean,
  gulp.parallel(styles, html, js, assets, imagesToWebp, imagesToMobileWebp, svg)
);

export default gulp.series(build, serve);