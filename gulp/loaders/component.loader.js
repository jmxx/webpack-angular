'use strict';

import path         from 'path';
import * as utils   from './utils';

const camelCase = require('lodash').camelCase;

module.exports = function (input) {
  this.cacheable && this.cacheable();
  
  const fileName = path.basename(this.resourcePath, '.component.js');
  const controllerName = `${utils.capitalize(camelCase(fileName))}Controller`;
  const directiveName = camelCase(utils.getDirectiveName(this.resourcePath));

  if (this.resourcePath.indexOf('.component.js') < 0) {
    return input;
  }

  return input + `
    if (module.hot) {
      module.hot.accept();
      // get controller instance
      const name = ${controllerName}.name;
      // don't do anything if the directive is not printed
      const doc = angular.element(document.body);
      const injector = doc.injector();
      if (injector) {
        const directive = injector.get('${directiveName}Directive')[0];
        console.log('${directiveName}');
        console.log(directive);
        if (directive) {
          const origin = directive.controller;
          const target = ${controllerName}.prototype;
          const enumAndNonenum = Object.getOwnPropertyNames(target);
          const enumOnly = Object.keys(target);
          // not found in enumOnly keys mean the key is non-enumerable,
          // so return true so we keep this in the filter if it's not the constructor
          const nonenumOnly = enumAndNonenum.filter(key => enumOnly.indexOf(key) === -1 && key !== 'constructor');
          nonenumOnly.forEach(val => origin.prototype[val] = target[val]);

          // trigger rootscope update
          doc.scope().$apply();
          console.info('Hot Swapped ' + name);
        }
      }
    }
  `;
};
