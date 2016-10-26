'use strict';

import path               from 'path';
import webpack            from 'webpack';

// import componentHotLoader from '../loaders/component.loader';
import paths              from './paths';
import config             from './webpack.common';

const componentHotLoader  = require.resolve('../loaders/component.loader');
const htmlHotLoader       = require.resolve('../loaders/html.loader');

// Here, we extend webpack common config
config.output = {
  filename: 'app/[name].bundle.js',
  publicPath: '/',
  path: paths.srcPath
};

// add less loader config
config.module.loaders.push(
  { test: /\.styl/, loader: 'style-loader!css-loader?sourceMap!stylus-loader?sourceMap' }
);

// add component hot loader
(config.module.preLoaders = config.module.preLoaders || []).push(
  {
    test: /\.js$/,
    loader: componentHotLoader,
    include: [
      paths.appPath,
    ],
    exclude: [/lib/, /node_modules/, /\.spec\.js/, /app\.component\.js/, /\*\.controller\.js/]
  }
);

// add html hot loader to post loaders, this will replace the current html
// with the modified version of html
(config.module.postLoaders = config.module.postLoaders || []).push(
  {
    test: /\.html$/,
    loader: htmlHotLoader,
    include: [
      paths.appPath,
    ],
    exclude: [/lib/, /node_modules/, /app\/index\.html$/]
  }
);

// add hot module replacement plugin
config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

export default config;
