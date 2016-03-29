var gulp 					= require('gulp'),
		autoprefixer 	= require('gulp-autoprefixer'),
		browserSync 	= require('browser-sync'),
		cache 				= require('gulp-cache'),
		concat 				= require('gulp-concat'),
		cssnano 			= require('gulp-cssnano'),
		del 					= require('del'),
		htmlmin 			= require('gulp-htmlmin'),
		imagemin 			= require('gulp-imagemin'),
		pngquant 			= require('imagemin-pngquant'),
		rename 				= require('gulp-rename'),
		sass 					= require('gulp-sass'),
		uglify 				= require('gulp-uglifyjs');

// sass
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

// scripts
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/modernizr/modernizr.js',
		'app/libs/waypoints/waypoints.min.js',
		'app/libs/animate/animate-css.js',
		'app/libs/plugins-scroll/plugins-scroll.js',
		'app/libs/jquery.jscroll/jquery.jscroll.min.js', /* Динамическая подгрузка контента про скролле */
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('common-min', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/modernizr/modernizr.js',
		'app/libs/waypoints/waypoints.min.js',
		'app/libs/animate/animate-css.js',
		'app/libs/plugins-scroll/plugins-scroll.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('_clear', function(){
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		prograssive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('htmlmin', function(){
	return gulp.src('app/**/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'))
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('_dist', ['clean', 'img', 'sass', 'scripts', 'htmlmin'], function(){
	
	var buildCss = gulp.src('app/css/*.css')
	.pipe(gulp.dest('dist/css'));
	
	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
	
	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));
	
});

gulp.task('_defoult',['watch']);