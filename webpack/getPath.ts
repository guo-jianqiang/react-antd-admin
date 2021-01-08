const path = require('path')
const getPath = function (dir: string) {
      const appDirectory = process.cwd()
      return path.join(appDirectory, dir)
    }
export default {
  getPath,
  DIST: getPath('dist'),
  MATCH_NODE_MODULES: getPath('/node_modules/'),
  PATH_SRC: getPath('src')
}