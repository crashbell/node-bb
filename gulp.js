import 'babel-polyfill'
import gulp from 'gulp'
import del from 'del'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import nodemon from 'gulp-nodemon'
import vinylPaths from 'vinyl-paths'

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
  return gulp.src('build/**')
    .pipe(vinylPaths(del))
})

gulp.task('build', ['lint'], () => {
  return gulp.src(dirs.jsPath)
    .pipe(babel())
    .pipe(gulp.dest('build'))
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