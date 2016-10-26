'use strict';

import path               from 'path';
import HtmlWebpackPlugin  from 'html-webpack-plugin';
import webpack            from 'webpack';

import paths    from './paths';

export default {
  devtool: 'source-map',
  entry: {},
  module: {
    // add loaders
    loaders: [
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel-loader' },
      { test: /\.html$/, exclude: [/app\/lib/, /node_modules/], loader: 'raw-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|otf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'app/vendors.bundle.js',
      chunks: ['app'],
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(paths.srcPath) === -1;
      }
    }),

    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      hash: true,
      chunks: ['vendors', 'app']
    }),
  ],
  resolve: {
    // add alias to resolve object, so we can use
    // @import 'quo/'
    alias: {
      quo: paths.appPath
    }
  }
};
