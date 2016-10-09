import 'babel-polyfill'
import del from 'del'
import gulp from 'gulp'
import babel from 'gulp-babel'
import nodemon from 'gulp-nodemon'

const dirs = {
  jsPath: 'lib/**/*.js',
  dest: 'build'
}

gulp.task('default', ['watch'], () => {
  nodemon({
    script: 'build/index.js',
	  env: {'NODE_ENV': 'development'}
  })
})

gulp.task('clean', () => {
	return del(dirs.dest, {force: true, dryRun: true})
})

gulp.task('build', ['clean'], () => {
	return gulp.src(dirs.jsPath)
	  .pipe(babel())
	  .pipe(gulp.dest('build'))
})

gulp.task('serve', ['build'], () => {
	nodemon({
    script: 'build/index.js',
	  env: {'NODE_ENV': 'production'}
  })
})

gulp.task('watch', ['build'], () => {
	return gulp.watch(dirs.jsPath, ['build'])
})