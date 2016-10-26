import gulp                 from 'gulp';
import gutil                from 'gulp-util';
import del                  from 'del';
import path                 from 'path';

import paths                from './config/paths';

gulp.task('clean', (done) => {
  let pathsToDelete = [
    path.join(paths.destPath, '*'),
    '!' + path.join(paths.destPath, '.gitignore'), // .gitignore
  ];

  del(pathsToDelete).then(function (paths) {
    gutil.log("[clean]", paths);
    done();
  });
});
