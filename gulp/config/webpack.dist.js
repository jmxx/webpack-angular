'use strict';

import path               from 'path';
import webpack            from 'webpack';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';

// import componentHotLoader from '../loaders/component.loader';
import paths              from './paths';
import config             from './webpack.common';

const stylLoader = ExtractTextPlugin.extract(
  'css-loader?minimize&importLoaders=1&sourceMap!stylus-loader?sourceMap'
);

// Here, we extend webpack common config
config.output = {
  filename: 'app/[name].bundle.js',
  publicPath: '/',
  path: paths.destPath
};

config.module.loaders.push(
  { test: /\.styl/, loader: stylLoader }
);

// Prepend plugins
config.plugins.unshift(
  // Extract the compiled less styles into its own file
  new ExtractTextPlugin('css/[name].bundle.css', { allChunks: true })
);

// Appen plugins
config.plugins.push(
  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    mangle: {

      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  })
);

export default config;
