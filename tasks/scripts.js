import { dirs, getComponentsFiles, isDev, lists, fileExistAndHasContent } from './utils/utils'
import errorHandler from 'gulp-plumber-error-handler'
import gulp from 'gulp'
import makeWebpackConfig from '../webpack.config.js'
import plumber from 'gulp-plumber'
import statsLogger from 'webpack-stats-logger'
import webpack from 'webpack'
import fs from 'fs'

// Запишем файл js скриптов диспетчер подключений
let jsImports = '/**\n * ВНИМАНИЕ! Этот файл генерируется автоматически.\n * Не пишите сюда ничего вручную, все такие правки будут потеряны.\n * Читайте ./README.md для понимания.\n */\n\n';
lists.js.forEach(function(blockPath) {
  jsImports += blockPath;
});
fs.writeFileSync(dirs.srcPath + 'js/script.js', jsImports);


// const webpack = webpackStream.webpack
const { NOTIFY } = process.env
const scriptsErrorHandler = errorHandler('Error in \'scripts\' task')

function runWebpack(watch = false) {
	return function (callback) {
		const webpackConfig = makeWebpackConfig({
			watch,
			debug: isDev,
			sourcemaps: isDev,
			notify: NOTIFY
		});

		return webpack(webpackConfig, (error, stats) => {
			const jsonStats = stats.toJson();
			if (jsonStats.errors.length) {
				jsonStats.errors.forEach(message => {
					scriptsErrorHandler.call({emit() {/* noop */}}, {message});
				});
			}
			statsLogger(error, stats);

			// solve the issue https://github.com/CSSSR/csssr-project-template/issues/169
			if (watch === false) {
				callback();
			}
		});
	};
}

gulp.task('scripts', runWebpack(false));

gulp.task('scripts:watch', runWebpack(true));
