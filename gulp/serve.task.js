import browsrSync             from 'browser-sync';
import colorsSupported        from 'supports-color';
import gulp                   from 'gulp';
import webpack                from 'webpack';
import webpackDevMiddleware   from 'webpack-dev-middleware';
import webpackHotMiddleware   from 'webpack-hot-middleware';

import paths                  from './config/paths';

gulp.task('serve', (done) => {
  let config = require('./config/webpack.dev').default
    , compiler;

  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
  ].concat(paths.entry.app);

  // Get the webpack compiler
  compiler = webpack(config);

  // Init browser-sync to start the server and open the browser
  browsrSync.init({
    port: 3000,
    // host: 'localquo.corpfolder.com',
    // open: 'external',
    server: {
      baseDir: paths.destPath
    },
    middleware: [
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: '/'
      }),
      webpackHotMiddleware(compiler)
    ]
  }, done);
});
