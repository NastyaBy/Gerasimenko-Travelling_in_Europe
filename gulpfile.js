const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const htmlmin = require("gulp-htmlmin");
const minify = require("gulp-minify");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const del = require("del");

// Styles
const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//Images
const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo(),
    ]))
}

exports.images = images;

//Webp
const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

//SVG sprite
const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

//Copy
const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

//Html
const html = () => {
  return gulp.src([
    "source/*.html"
  ], {
    base: "source"
  })
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
};

exports.html = html;

//js
const minifyjs = () => {

  return gulp.src("source/js/*.js", {allowEmpty: true})
    .pipe(minify({
      ext:{
        src:'.js',
        min:'.min.js'
      }
    }))
    .pipe(gulp.dest("build/js"))
};

exports.minifyjs = minifyjs;

//Clean
  const clean = () => {
    return del("build");
  };

  exports.clean = clean;

// Server
  const server = (done) => {
    sync.init({
      server: {
        baseDir: 'build'
      },
      cors: true,
      notify: false,
      ui: false,
    });
    done();
  }

  exports.server = server;

// Watcher
  const watcher = () => {
    gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
    gulp.watch("src/**/*.js");
    gulp.watch("source/*.html").on("change", sync.reload);
  }

//Build

  const build = gulp.series(clean, copy, styles, sprite, html, minifyjs);
  exports.build = build;


  const watch = gulp.series(build, watcher)
  exports.watch = watch

  exports.start = gulp.series(server, build)
