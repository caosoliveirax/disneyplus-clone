import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

function images() {
    return gulp.src('./src/images/**/*', { encoding:false,})
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
};

function styles() {
    return gulp.src('./src/styles/*.scss')
    .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

function watchFiles() {
    gulp.watch('./src/styles/**/*.scss', styles);
    gulp.watch('./src/images', images);
}

export {styles, images};

gulp.task('default', gulp.series(
    gulp.parallel(styles, images), watchFiles));