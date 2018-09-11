var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

// Static Server + watching scss/html files
gulp.task('serve', function() {
	browserSync.init({
		server: '.'
	});

	gulp.watch('scss/**/*.scss', [ 'sass' ]);
	gulp.watch('img/*', [ 'imagemin' ]);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('clean', function() {
	return gulp.src('dist/*', { force: true }).pipe(clean());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp
		.src('scss/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
	return	gulp
		.src('img')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('scripts', function() {
	return gulp.src('js/main.js')
	  // Minify the file
	  .pipe(uglify())
	  // Output
	  .pipe(gulp.dest('dist/js'))
  });
gulp.task('default', [ 'sass', 'serve', 'imagemin', 'scripts' ]);

/* gulp dependencies */
