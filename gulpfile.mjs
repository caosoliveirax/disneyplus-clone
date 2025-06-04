import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

function scripts() {
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}

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
    gulp.watch('./src/scripts/*.js', scripts)
}

export {styles, images, scripts};

export const build = gulp.series(gulp.parallel(styles, images, scripts));

export default gulp.series(build, watchFiles);