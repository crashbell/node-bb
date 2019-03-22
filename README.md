# node-babel-boilerplate [![Build Status](https://travis-ci.org/crashbell/node-bb.svg?branch=master)](https://travis-ci.org/crashbell/node-bb)[![npm version](https://badge.fury.io/js/node-bb.svg)](https://badge.fury.io/js/node-bb)

Centralize build steps in one library. For any application applies Babel, Gulp tasks and ESLint, just simply include this library in `package.json`, it will automatically __overwrite__ `.babelrc`, `.eslintrc`, `gulp.js`

```json
  "devDependencies": {
    "node-bb": "*"
  }
```

# Setup

Create `package.json` scripts
```json
  "scripts": {
    "start": "gulp clean && NODE_ENV=development gulp",
    "lint": "gulp lint",
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
- [x] ESLint

Further Things:
- [ ] Gulp task for running Test with Mocha
- [ ] Unit Test
