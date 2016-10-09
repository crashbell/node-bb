import 'babel-polyfill'
import gulp from 'gulp'
import rename from 'gulp-rename'
import nodemon from 'gulp-nodemon'
import {exec} from 'child_process'
import tasks from './gulp'

const copyFile = ['.babelrc', '.eslintrc', 'gulp.js']

gulp.task('copy-rc', () => {
	for(const file of copyFile) {
		gulp.src(file).pipe(gulp.dest('build/rc'))
	}
})

gulp.task('prepublish', ['build', 'copy-rc'], () => {
	gulp
		.src('.gitignore')
  	.pipe(rename('.gitignore.tmp'))
})

gulp.task('postpublish', () => {
	gulp
		.src('.gitignore.tmp')
  	.pipe(rename('.gitignore'))
})

gulp.task('serve', ['build', 'copy-rc'], () => {
	nodemon({
    script: 'build/index.js',
	  env: {'NODE_ENV': 'development'}
  })
})