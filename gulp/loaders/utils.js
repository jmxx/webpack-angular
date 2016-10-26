'use strict';

import path from 'path';
import fs   from 'fs';

let cacheDirectives = {};

/**
 * Check if file exists synchronously
 * @param  {[type]} filepath [description]
 * @return {[type]}          [description]
 */
let existstFile = (filepath) => {
  try {
    fs.accessSync(filepath);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Helper function to capitalize
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Get directive name from component definition. This is useful for hot module reloading
 * and custom loaders. It will check definition inside index.js or modulename.js
 *
 * @param  {[type]} filepath [description]
 * @return {[type]}          [description]
 */
export function getDirectiveName(filepath) {
  let search = '.component(\''
    , dirname = path.dirname(filepath)
    , basename = path.basename(dirname)
    , str = ''
    , index = 0;

  if (cacheDirectives[basename]) {
    return cacheDirectives[basename];
  }

  filepath = path.join(dirname, 'index.js');
  if (existstFile(filepath)) {
    str = fs.readFileSync(filepath, 'utf8');
    if ((index = str.indexOf(search)) >= 0) {
      index += search.length;
      return (cacheDirectives[basename] = str.substring(index, str.indexOf('\'', index + 1)));
    }
  }

  filepath = path.join(dirname, `${basename}.js`);
  if (existstFile(filepath)) {
    str = fs.readFileSync(filepath, 'utf8');
    if ((index = str.indexOf(search)) >= 0) {
      index += search.length;
      return (cacheDirectives[basename] = str.substring(index, str.indexOf('\'', index + 1)));
    }
  }

  return basename;
}
