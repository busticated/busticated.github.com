({
    optimize: 'uglify', //usage: "uglify" (def) "closure", "closure.keepLines", or "none"
    baseUrl: 'js',
    dir: 'js-built',
    optimizeCss: 'standard', //usage: "standard", "standard.keepLines", or "none"
    cssImportIgnore: null, //usage: "this.css, that.css" to exclude from inlining
    inlineText: true, //inline and !text dependencies
    paths: {
        'jquery': 'libs/jquery'
    },
    modules: [
        { name: 'main' }
        // { name: 'libs/require', include: [ 'main', 'libs/require' ] }
            // this will package all deps & the require lib itself into a single file
            // gotchas:
            // + need to remove data-main attr or require will load that file
            // + once data-main attr is removed, path look-up will be relative to root
            //   - before: if data-main="js/main", all deps are relative to 'js/' (ex: 'mods/looper' loads from 'js/mods/looper.js')
            //   - after: without data-main, all deps are relative to root (ex: 'mods/looper' loads from './mods/looper.js')
    ]
})
