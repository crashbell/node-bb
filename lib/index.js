import path from 'path'
import {throwWarn} from './logger'
import fileUtil from './file-util'

try {
  const root = path.dirname(fileUtil._findParent(module).filename)
  const projectPath = fileUtil.findProjectRoot(root)

  fileUtil.copy(path.resolve(root, 'rc'), projectPath, {overwrite: true})
}
catch (err) {
  throwWarn(err)
}
