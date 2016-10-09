import 'babel-polyfill'
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import {exec} from 'child_process'
import tasks from './gulp'

const copyFile = ['.babelrc', 'gulp.js']

gulp.task
export function copy(src, dest = Paths.BUILD) {
  return () => {
    return pipe(src, dest)
  }
}

gulp.task('copy-rc', () => {
	for(const file of copyFile) {
		gulp.src(file).pipe(gulp.dest('build/rc'))
	}
})

gulp.task('prepublish', ['build', 'copy-rc'], () => {

})

gulp.task('serve', ['build', 'copy-rc'], () => {
	nodemon({
    script: 'build/index.js',
	  env: {'NODE_ENV': 'development'}
  })
})