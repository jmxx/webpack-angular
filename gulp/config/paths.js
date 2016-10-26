'use strict';

import path from 'path';

let srcPath = path.resolve(process.cwd(), 'src')
  , appPath = path.resolve(process.cwd(), 'src/app')
  , destPath = path.resolve(process.cwd(), 'dist');

export default {
  srcPath,
  appPath,
  destPath,
  entry: {
    app: [
      path.join(srcPath, 'styl/app.styl'),
      // 'babel-polyfill',
      path.join(srcPath, 'app/app.js')
    ]
  }
};
