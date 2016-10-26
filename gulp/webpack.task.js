import gulp                 from 'gulp';
import gutil                from 'gulp-util';
import webpack              from 'webpack';
import colorsSupported      from 'supports-color';

import paths                from './config/paths';

gulp.task('webpack', gulp.series('clean', (done) => {
  let config = require('./config/webpack.dist').default;

  config.entry = paths.entry;

  webpack(config, (err, stats) => {
    if(err)  {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    done();
  });
}));
