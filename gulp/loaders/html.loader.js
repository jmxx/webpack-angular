'use strict';

import path         from 'path';
import * as utils   from './utils';

const kebabCase = require('lodash').kebabCase;
const camelCase = require('lodash').camelCase;

module.exports = function (input) {
  this.cacheable && this.cacheable();
  const fileName = utils.getDirectiveName(this.resourcePath);
  const tagName = kebabCase(fileName);
  const directiveName = camelCase(fileName);

  return input +  `
    if (module.hot) {
      module.hot.accept(console.log.bind(console));
      const newTpl = module.exports;
      const doc = angular.element(document.body);
      const injector = doc.injector();
      console.log(injector);
      if(injector) {
        const $compile = injector.get('$compile');
        const oldTemplate = injector.get('${directiveName}Directive')[0];
        if (oldTemplate.template !== newTpl) {
          oldTemplate.template = newTpl;
          // doc.find has to be cast to an Array
          const elems = Array.prototype.slice.call(doc.find('${tagName}'));
          elems.forEach(elt => {
            const angularElement = angular.element(elt);
            const scope = angularElement.isolateScope();
            angularElement.html(newTpl);
            $compile(angularElement.contents())(scope);
          });
        }
        // trigger rootscope update
        doc.scope().$apply();
        console.info('Hot Swapped template ' + name);
      }
    }
  `;
};
