const { series, src, dest, watch } = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');
const browserSync = require('browser-sync').create();

const build = series(html, scripts, styles, vendorsJS);

module.exports = {
    default: defaultTask,
    build: build,
    dev: series(build, watchSources),
    serve: series(build, serve),
}

function defaultTask(done) {
    console.log('default gulp task');
    done();
}

function html() {
    console.log('...building html');
    return src('./src/index.html')
        .pipe(dest('./dist'));
}

function scripts() {
    console.log('...building scripts');
    return src('./src/**/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(babel())
            .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))        
        .pipe(dest('./dist'));
}

function styles() {
    console.log('...building styles');
    return src('./src/**/*.sass')
        .pipe(concat('styles.sass'))
        .pipe(sass())
        .pipe(dest('./dist'));
}

function watchSources() {
    watch('./src/**/*.js', scripts);
    watch('./src/**/*.sass', styles);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    watch('./src/**/*.js', series(scripts, reloadServer));
    watch('./src/**/*.sass', series(styles, reloadServer));
}

function reloadServer(done) {
    browserSync.reload();
    done();
}

function vendorsJS() {
    return src(['./node_modules/jquery/dist/jquery.js'],
        ['./node_modules/jquery-ui-dist/jquery-ui.js'])
        .pipe(concat('vendors.js'))
        .pipe(dest('./dist'));
}