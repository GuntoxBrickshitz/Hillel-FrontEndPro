const { series, src, dest, watch } = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');
const browserSync = require('browser-sync').create();

const vendorJsSrc = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/jquery-simplegallery/js/jquery.gallery.js'    
];

const vendorCssSrc = [
    './node_modules/jquery-simplegallery/css/jquery.gallery.css',
    './node_modules/jquery-simplegallery/css/font-awesome.css'    
];

const source = src(
    [
        './dist/vendors-min.js',
        './dist/all.js',
        './dist/vendors.css',
        './dist/styles.css'
    ],
    {
        read: false
    }
);

const build = series(html, scripts, styles, vendorsJS, vendorsCSS, injectSrc);

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
    return src(vendorJsSrc)
        .pipe(concat('vendors.js'))
        .pipe(minify())
        .pipe(dest('./dist'));
}

function vendorsCSS() {
    return src(vendorCssSrc)
        .pipe(concat('vendors.css'))
        .pipe(minify())
        .pipe(dest('./dist'));
}

function injectSrc() {
    return src('./dist/index.html')
        .pipe(
            inject(source, {
                relative: true,
                transform: function(path) {
                    if (path.endsWith('.js')) {
                        return `<script src="${path}" defer></script>`;
                    }
                    return inject.transform(...arguments);
                }
            })
        )
        .pipe(dest('./dist'));
}