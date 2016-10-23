import 'babel-polyfill'
import del from 'del'
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import {exec} from 'child_process'
import tasks from './gulp'

const copyFile = ['.babelrc', '.eslintrc', 'gulp.js']

for(const file of copyFile) {
	gulp.task(file, () => {
		return gulp.src(file).pipe(gulp.dest('build/rc'))
	})
}
gulp.task('copy', copyFile)

gulp.task('prepublish', ['build', 'copy'])

gulp.task('serve', ['build', 'copy'], () => {
	nodemon({
    script: 'build/index.js',
	  env: {'NODE_ENV': 'development'}
  })
})