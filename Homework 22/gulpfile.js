const { series, src } = require('gulp');


module.exports = {
    default: defaultTask,
    build: series(html, scripts, styles)
}

function defaultTask(done) {
    console.log('default gulp task');
    done();
}

function html() {

}