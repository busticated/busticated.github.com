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
	]
})
