// var elixir = require('laravel-elixir');

var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var autoprefix = require('gulp-autoprefixer');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var path = require('path');

var baseDir = './angular/';

var onError = function (err) {
		notify.onError({
			title: "Laravel Elixir",
			subtitle: "Bower Files Compilation Failed!",
			message: "Error: <%= error.message %>",
			icon: __dirname + '/../node_modules/laravel-elixir/icons/fail.png'
		})(err);
		this.emit('end');
	};

// gulp.task('vendorjs', function() {
// 	var jsFile = 'vendor.js';
// 	gulp.src(mainBowerFiles)
// 	.on('error', onError)
// 	.pipe(filter('**/*.js'))
// 	.pipe(concat(jsFile, {sourcesContent: true}))
// 	.pipe(gulp.dest('./public/js'));
// });

gulp.task('bower-js', function() {
	var jsFile = 'vendor.js';
	var jsOutputFolder = './public/js';
	return gulp.src(mainBowerFiles())
		.on('error', onError)
		.pipe(filter('**/*.js'))
		.pipe(concat(jsFile, {sourcesContent: true}))
		.pipe(uglify())
		// .pipe(gulpIf(Elixir.config.production, uglify()))
		.pipe(gulp.dest(jsOutputFolder || Elixir.config.js.outputFolder))
}).watch('bower.json');

gulp.task('bower-css', function(){
	var cssFile = 'vendor.css';
	var cssOutputFolder = './public/css';
	return gulp.src(mainBowerFiles())
		.on('error', onError)
		.pipe(filter('**/*.css'))
		.pipe(concat(cssFile))
		// .pipe(gulpIf(config.production, minify()))
		.pipe(gulp.dest(cssOutputFolder || config.css.outputFolder))
}).watch('bower.json');

gulp.task('angular-js', function() {
	// Main file has to be included first.
	return gulp.src([baseDir + "main.js", baseDir + "**/*.js"])
		.pipe(jshint())
		// .pipe(jshint.reporter(stylish))
		//.pipe(jshint.reporter('fail')).on('error', onError) //enable this if you want to force jshint to validate
		// .pipe(gulpif(! config.production, sourcemaps.init()))
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		// .pipe(gulpif(config.production, uglify()))
		// .pipe(gulpif(! config.production, sourcemaps.write()))
		.pipe(gulp.dest('./public/js'))
		// .less('./angular/**/*.less', 'public/css')
		// .copy('./angular/app/**/*.html', 'public/views/app/')
		// .copy('./angular/directives/**/*.html', 'public/views/directives/')
		// .copy('./angular/dialogs/**/*.html', 'public/views/dialogs/')
		// .pipe(notify({
		// 	title: 'Laravel Elixir',
		// 	subtitle: 'Angular Compiled!',
		// 	icon: __dirname + '/../node_modules/laravel-elixir/icons/laravel.png',
		// 	message: ' '
		// }));
}).watch(baseDir + '/**/*.js');

gulp.task('styles', function() {
	var cssOutputFolder = './public/css';
	gulp.src('./resources/assets/less/app.less')
	.pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes')]
	}))
	.pipe(concat('app.css'))
	.pipe(autoprefix({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Explorer >= 8', 'Safari >= 7', 'edge >= 1', 'iOS >= 7']}))
	.pipe(gulp.dest(cssOutputFolder || config.css.outputFolder))
});


gulp.task('default', ['bower-js','bower-css','angular-js','styles'], function() {
	gulp.watch('bower.json', ['bower-js', 'bower-css']);
	gulp.watch('./angular/**/*.js', ['angular-js']);
	gulp.watch('./resources/assets/less/app.less');
});
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

// elixir(function(mix) {
//     mix.less('app.less');
// });
// include gulp
// var gulp = require('gulp');

// // include plug-ins
// var jshint = require('gulp-jshint');
// var changed = require('gulp-changed');
// var imagemin = require('gulp-imagemin');
// var concat = require('gulp-concat');
// var stripDebug = require('gulp-strip-debug');
// var uglify = require('gulp-uglify');
// var autoprefix = require('gulp-autoprefixer');
// var minifyCSS = require('gulp-minify-css');
// var addsrc = require('gulp-add-src');
// var less = require('gulp-less');
// var path = require('path');

// // default gulp task
// gulp.task('default', ['imagemin', 'scripts', 'less', 'jshint'], function() {
// 	// watch for JS changes
// 	gulp.watch('./src/scripts/**/*.js', ['jshint', 'scripts']);
// 	gulp.watch('./src/scripts/*.js', ['jshint']);
// 	// watch for Less changes
// 	gulp.watch('./src/less/*.less', ['less']);
// 	// watch for images
// 	gulp.watch('./src/images/*', ['imagemin']);
// });

// gulp.task('jshint', function(){
// 	gulp.src('./src/scripts.*js')
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('default'));
// });

// // minify new images
// gulp.task('imagemin', function(){
// 	var imgSrc = './src/images/**/*',
// 		imgDst = './assets/images';

// 	gulp.src(imgSrc)
// 		.pipe(changed(imgDst))
// 		.pipe(imagemin())
// 		.pipe(gulp.dest(imgDst));
// });

// // JS concat, strip debugging and minify
// gulp.task('scripts', function() {
//   gulp.src(['./src/scripts/*.js'])
//     // .pipe(stripDebug())
//     .pipe(jshint())
// 	.pipe(jshint.reporter('default'))
//     .pipe(addsrc('./src/scripts/lib/*.js'))
//     // .pipe(addsrc('./src/webantic/webantic.js'))
//     // .pipe(uglify())
//     .pipe(concat('app.js'))
//     .pipe(gulp.dest('./assets/scripts/'));
// });

// // Less concat, auto-prefix and minify
// gulp.task('less', function(){
// 	gulp.src('./src/less/styles.less')
// 	.pipe(less({
// 		paths: [ path.join(__dirname, 'less', 'includes')]
// 	}))
// 	.pipe(concat('styles.css'))
//     .pipe(autoprefix({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Explorer >= 8', 'Safari >= 7', 'edge >= 1', 'iOS >= 7']}))
//     // .pipe(autoprefix({ browsers: ['Android 4.4', 'and_uc 9.9', 'chrome 44', 'chrome 43', 'edge 1', 'firefox 40', 'firefox 39', 'ie 11', 'ie_mob 11', 'ios_saf 8.1', 'opera 30', 'safari 8']}))
//     // .pipe(minifyCSS())
//     .pipe(gulp.dest('./assets/styles/'));
// });
