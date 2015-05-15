module.exports = function() {
    var js = './js/';
    var css = './css/';
    var config = {
        allJs:[
            js + 'jquery-1.11.2.min.js',
            js + 'bootstrap.min.js',
            js + 'app.js'
        ],
        allCss: [
            css + '*.css',
            '!' + css + '*.min.css',
            '!' + css + '*.css.map'
        ],
        minCss: css + 'all.min.css',
        minJs: js + 'all.min.js',
        js: js,
        css: css
    };
    return config;
};
