// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation
// for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var gulp       = require('gulp'),
    $          = require('gulp-load-plugins')(),
    rimraf     = require('rimraf'),
    sequence   = require('run-sequence'),
    path       = require('path'),
    modRewrite = require('connect-modrewrite'),
    router     = require('./bower_components/foundation-apps/bin/gulp-dynamic-routing')
    ;

// 2. SETTINGS VARIABLES
// - - - - - - - - - - - - - - -

// Sass will check these folders for files when you use @import.
var sassPaths = [
  'client/assets/scss',
  'bower_components/foundation-apps/scss',
  'bower_components/font-awesome/scss'
];
// These files include Foundation for Apps and its dependencies
var foundationJS = [
  'bower_components/fastclick/lib/fastclick.js',
  'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
  'bower_components/tether/tether.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/ui-router/release/angular-ui-router.js',
  'bower_components/foundation-apps/js/vendor/**/*.js',
  'bower_components/foundation-apps/js/angular/**/*.js',
  '!bower_components/foundation-apps/js/angular/app.js',
  'bower_components/lodash/lodash.js',
  'bower_components/hammerjs/hammer.js',
    'bower_components/angular-scroll-glue/src/scrollglue.js'
];
// These files are for your app's JavaScript
var appJS = [
  'client/assets/js/app.js',
  'client/assets/js/modules/kswDirectiveModule.js',
  'client/assets/js/modules/kswFilterModule.js',
  'client/assets/js/filters/kswCapitalizeFilter.js',
  'client/assets/js/filters/kswUrlFilter.js',
  'client/assets/js/filters/kswDateDifference.js',
  'client/assets/js/filters/kswUserNameFilter.js',
  'client/assets/js/filters/kswDocumentIconFilter.js',
    'client/assets/js/filters/kswImageFilter.js',
  'client/assets/js/services/ApiService.js',
  'client/assets/js/services/LoginService.js',
  'client/assets/js/services/UserContextService.js',
  'client/assets/js/services/EventService.js',
    'client/assets/js/services/ChatService.js',
    'client/assets/js/services/ConnectionRequestService.js',
  'client/assets/js/services/DummyDataService.js',
  'client/assets/js/services/AwardService.js',
  'client/assets/js/services/SignalService.js',
  'client/assets/js/services/MixPanelService.js',
    'client/assets/js/services/SignUpService.js',
    'client/assets/js/services/OrgService.js',
  'client/assets/js/controllers/LoginCtrl.js',
  'client/assets/js/controllers/ProfileCtrl.js',
  'client/assets/js/controllers/PersonalSettingsCtrl.js',
  'client/assets/js/controllers/NavigationCtrl.js',
  'client/assets/js/controllers/myNetWorkCtrl.js',
  'client/assets/js/controllers/myProfileCtrl.js',
    'client/assets/js/controllers/ChatCtrl.js',
    'client/assets/js/controllers/createAwardTemplateCtrl.js',
    'client/assets/js/controllers/previewAppCtrl.js',
    'client/assets/js/controllers/createOrgCtrl.js',
  'client/assets/js/controllers/myAwardCtrl.js',
  'client/assets/js/controllers/selectAwardCtrl.js',
  'client/assets/js/controllers/nominateAwardCtrl.js',
    'client/assets/js/controllers/signupCtrl.js',
    'client/assets/js/controllers/ConnectionRequestCtrl.js',
    'client/assets/js/controllers/searchCtrl.js',
    'client/assets/js/controllers/knotSiliconPreviewCtrl.js',
  'client/assets/js/directives/kswProfilePicture.js',
  'client/assets/js/directives/kswComposeSignal.js',
  'client/assets/js/directives/kswFileOnchange.js',
  'client/assets/js/directives/kswPeoplePicker.js',
  'client/assets/js/directives/kswLoggedInUser.js',
  'client/assets/js/directives/kswOnScroll.js',
  'client/assets/js/directives/kswReadMore.js',
  'client/assets/js/directives/kswWebLink.js',
  'client/assets/js/directives/kswUpdateStringArea.js',
    'client/assets/js/directives/kswDynamicHeight.js',
    'client/assets/js/directives/kswMiniPeoplePicker.js'
];

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Copies user-created files and Foundation assets
gulp.task('copy', function() {
  var dirs = [
    './client/**/*.*',
    '!./client/templates/**/*.*',
    '!./client/assets/{scss,js}/**/*.*'
  ];

  // Everything in the client folder except templates, Sass, and JS
  gulp.src(dirs, {
    base: './client/'
  })
      .pipe(gulp.dest('./build'));

  // Iconic SVG icons
  gulp.src('./bower_components/foundation-apps/iconic/**/*')
      .pipe(gulp.dest('./build/assets/img/iconic/'));

  gulp.src('./bower_components/font-awesome/fonts/**/*')
      .pipe(gulp.dest('./build/assets/fonts/'));

    gulp.src('./bower_components/socket.io-client/socket.io.js')
        .pipe(gulp.dest('./build/assets/js'));


  // Foundation's Angular partials
  return gulp.src(['./bower_components/foundation-apps/js/angular/components/**/*.html'])
      .pipe(gulp.dest('./build/components/'));
});

// Compiles Sass
gulp.task('sass', function() {
  return gulp.src('client/assets/scss/app.scss')
      .pipe($.rubySass({
        loadPath: sassPaths,
        style: 'nested',
        bundleExec: false
      })).on('error', function(e) {
        console.log(e);
      })
      .pipe($.autoprefixer({
        browsers: ['last 2 versions', 'ie 10']
      }))
      .pipe(gulp.dest('./build/assets/css/'));
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', function() {
  // Foundation JavaScript
  gulp.src(foundationJS)
      .pipe($.uglify({
        beautify: true,
        mangle: false
      }).on('error', function(e) {
        console.log(e);
      }))
      .pipe($.concat('foundation.js'))
      .pipe(gulp.dest('./build/assets/js/'))
  ;

  // App JavaScript
  return gulp.src(appJS)
      .pipe($.uglify({
        beautify: true,
        mangle: false
      }).on('error', function(e) {
        console.log(e);
      }))
      .pipe($.concat('app.js'))
      .pipe(gulp.dest('./build/assets/js/'))
      ;
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy-templates', ['copy'], function() {
  return gulp.src('./client/templates/**/*.html')
      .pipe(router({
        path: 'build/assets/js/routes.js',
        root: 'client'
      }))
      .pipe(gulp.dest('./build/templates'))
      ;
});

// Starts a test server, which you can view at http://localhost:8080
gulp.task('server:start', function() {
  $.connect.server({
    root: './build',
    livereload: true,
    middleware: function() {
      return [
        modRewrite(['^[^\\.]*$ /index.html [L]'])
      ];
    }
  });
});

// Builds your entire app once, without starting a server
gulp.task('build', function() {
  sequence('clean', ['copy', 'sass', 'uglify'], 'copy-templates', function() {
    console.log("Successfully built.");
  })
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build', 'server:start'], function() {
  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['uglify']);

  // Watch static files
  gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

  // Watch app templates
  gulp.watch(['./client/templates/**/*.html'], ['copy-templates']);
});