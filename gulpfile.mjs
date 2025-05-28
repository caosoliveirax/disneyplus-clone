import gulp, { watch } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);


function styles() {
    return gulp.src('./src/styles/*.scss')
    .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

function watchFiles() {
    gulp.watch('./src/styles/**/*.scss', styles);
}

export {styles};

gulp.task('default', gulp.series(
    gulp.parallel(styles), watchFiles));