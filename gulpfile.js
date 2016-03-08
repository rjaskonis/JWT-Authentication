/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename");

var webroot = "./assets/";
var bower_components = "./bower_components/";

var paths = {
  //js: webroot + "js/*.js",
  js: webroot + "js/**/*.js",
  minJs: webroot + "js/**/*.min.js",
  angularjs: bower_components + "angular/angular.min.js",
  angularjsRoute: bower_components + "angular-route/angular-route.min.js",
  angularjsUIRouter: bower_components + "angular-ui-router/release/angular-ui-router.min.js",
  angularjsResource: bower_components + "angular-resource/angular-resource.min.js",
  angularjsCookies: bower_components + "angular-cookies/angular-cookies.min.js",
  jquery: bower_components + "jquery/dist/jquery.min.js",
  bootstrapJs: bower_components + "bootstrap/dist/js/bootstrap.min.js",
  css: webroot + "css/**/*.css",
  minCss: webroot + "css/**/*.min.css",
  bootstrapCss: bower_components + "bootstrap/dist/css/bootstrap.min.css",
  concatJsDest: webroot + "js/site.min.js",
  concatCssDest: webroot + "css/site.min.css"
};

gulp.task("clean:js", function (cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
  return gulp.src([paths.angularjs, paths.angularjsRoute, paths.angularjsUIRouter, paths.angularjsResource, paths.angularjsCookies, paths.jquery, paths.bootstrapJs, "!" + paths.js, "!" + paths.minJs], {
    base: "."
  })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
  return gulp.src([ paths.css, paths.bootstrapCss, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
