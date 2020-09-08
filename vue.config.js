module.exports = {
	lintOnSave: false,
	publicPath: process.env.NODE_ENV === 'production'
		? '/' + process.env.CI_PROJECT_NAME + '/'
		: '/',
	configureWebpack: {
		// This entire configuration section can be removed to use defaults.
		// Otherwise this configures webpack to use a JS file for each package.
		/*optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
							// or node_modules/packageName
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `npm.${packageName.replace('@', '')}`;
						}
					}
				}
			}
		}*/
	}
}
