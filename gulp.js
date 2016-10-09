import 'babel-polyfill'
import del from 'del'
import gulp from 'gulp'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
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
	return del(dirs.dest, {force: true})
})

gulp.task('build', ['clean', 'lint'], () => {
	return gulp.src(dirs.jsPath)
	  .pipe(babel())
	  .pipe(gulp.dest(dirs.dest))
})

gulp.task('serve', ['lint', 'build'], () => {
	nodemon({
    script: 'build/index.js',
	  env: {'NODE_ENV': 'production'}
  })
})

gulp.task('lint', () => {
	return gulp.src(dirs.jsPath)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
})

gulp.task('watch', ['build'], () => {
	return gulp.watch(dirs.jsPath, ['build'])
})