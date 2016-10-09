import fs from 'fs'
import path from 'path'

class FileUtil {
  findProjectRoot(start) {
    start = start || path.dirname(this._findParent(module).filename)
    const position = start.indexOf('node_modules')
    let root = start.slice(0, position === -1 ? undefined : position - path.sep.length)

    if (root === path.resolve(root, '..')) {
      throw new Error('Unable to find a package.json for this project')
    }

    while (!fs.existsSync(path.join(root, 'package.json'))) {
      root = this.findProjectRoot(path.dirname(root))
    }

    return root
  }

  copy(source, target, options) {
    if (typeof target === 'object') {
      options = target
      target = undefined
    }

    options = options || {}

    const root = path.dirname(this._findParent(module).filename)
    const projectRoot = this.findProjectRoot(root)

    const sourcePath = path.resolve(root, source)
    const targetPath = path.resolve(projectRoot, target || source)

    if (targetPath.indexOf(projectRoot) !== 0) {
      throw new Error('Destination must be within project root')
    }

    this._copy(sourcePath, targetPath, options)
  }

  ///////////////////////////////////////////////////////
  /// @private
  //////////////////////////////////////////////////////
  
  _copy(source, target, options) {
    if (this._isDir(source)) {
      this._copyDirectory(source, target, options)
    }
    else {
      this._copyFile(source, target, options)
    }
  }

  _copyDirectory(source, target, options) {

    this._mkdir(target)

    const sources = fs.readdirSync(source)
    for (let i = 0, l = sources.length; i < l; ++i) {
      const sourcePath = path.join(source, sources[i])
      const targetPath = path.join(target, sources[i])

      this._copy(sourcePath, targetPath, options)
    }
  }

  _copyFile(source, target, options) {
    this._mkdir(path.dirname(target))

    const mode = ~process.umask() & parseInt('666', 8)

    if (fs.existsSync(target) &&
      !options.overwrite) {

      throw new Error(target + ' already exists')
    }

    let sourceContent = ''
    try {
      sourceContent = fs.readFileSync(source)
    }
    catch (ignored) {
      // no source to copy
    }

    fs.writeFileSync(target, sourceContent, {flag: 'w', mode})
  }

  _findParent(mod) {
    return mod.parent ? this._findParent(mod.parent) : mod
  }

  _isDir(path) {
    try {
      const stat = fs.statSync(path)
      return stat.isDirectory()
    }
    catch (e) {
      return false
    }
  }

  _mkdir(pathDir) {
    const mode = ~process.umask() & parseInt('777', 8)

    if (this._isDir(pathDir)) {
      return
    }

    try {
      fs.mkdirSync(pathDir, mode)
    }
    catch (err) {
      if (err.code !== 'ENOENT') {
        throw err
      }

      this._mkdir(path.dirname(pathDir))
      this._mkdir(pathDir)
    }
  }
}

export default new FileUtil()
