# node-babel-boilerplate
Centralize build steps in one library. For any application applies Babel, Gulp tasks and ESLint, just simply include this library in `package.json`, it will automatically __overwrite__ `.babelrc`, `gulp.js` files

```json
  "devDependencies": {
    "node-bb": "*"
  }
```

# Basic setup

Create `package.json` scripts
```json
  "scripts": {
    "start": "gulp clean && NODE_ENV=development gulp",
    "build": "gulp build",
    "serve": "gulp serve"
  }
```

Include `gulp.js` in `gulpfile.babel.js`

```js
import 'babel-polyfill'
import './gulp'
```

Features:
- [x] Babel
- [x] Basic Gulp tasks: watch, build, serve

Further Things:
- [ ] Gulp task for running Test with Mocha
- [ ] Unit Test
- [ ] ESLint