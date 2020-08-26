import fs from 'fs'

// * 트랜스파일이 필요없는 모듈명의 정규식이 담깁니다.
const doesntNeedTranspile = [/^@nuxt.?/, /^@vue.?/, 'nuxt', 'core-js']
// * 노드 모듈 목록에서 트랜스파일 되면 안 되는 경로를 명시합니다.
const exceptionList = ['./node_modules/core-js', './node_modules/core-js-compat']

export default () => {
  // Apply all modules to be transpile.
  const getDependencies = ignoreRegexs => {
    const packageJson = require('./package.json')
    const dependencies = Object.keys(packageJson.dependencies)
    const result = []
    for (let dependency of dependencies) {
      let isIgnored = false
      for (let ignoreRegex of ignoreRegexs) {
        if (new RegExp(ignoreRegex).test(dependency)) {
          isIgnored = true
          break
        }
      }
      if (!isIgnored) result.push(dependency)
    }
    return result
  }
  const targetNonDevModules = getDependencies(doesntNeedTranspile)

  const collect = (staticPath, subPath = '/') => {
    let files = fs.readdirSync(staticPath)
    let folders = [{ subPath, staticPath }]

    for (let file of files) {
      let checkPath = staticPath + '/' + file
      let stats = fs.statSync(checkPath)
      if (!stats.isDirectory()) continue

      if (exceptionList.indexOf(checkPath) != -1) continue
      let collectedDatas = collect(checkPath, subPath + file + '/')

      for (let collectedData of collectedDatas) folders.push(collectedData)
    }

    return folders
  }

  const find = staticPath => {
    let folders = []

    for (let folder of collect(staticPath)) if (fs.existsSync(folder.staticPath + `/package.json`)) folders.push(folder.staticPath)

    return folders
  }

  const patch = staticPath => {
    let folders = find(staticPath)

    let moduleNames = []
    for (let folderName of folders) {
      let stats = fs.statSync(folderName)
      if (!stats.isDirectory()) continue

      try {
        let packageFilePath = `${folderName}/package.json`
        let packageFileData = JSON.parse(String(fs.readFileSync(packageFilePath)))
        if (packageFileData.name !== undefined) moduleNames.push(packageFileData.name)
        moduleNames = [...moduleNames, ...Object.keys(packageFileData.dependencies)]
      } catch (e) {}
    }
    return moduleNames
  }

  let babelModuleTargets: string[] = []
  for (let module of targetNonDevModules) {
    const targetPath = `./node_modules/${module}`
    babelModuleTargets = [...babelModuleTargets, ...patch(targetPath)]
  }
  return babelModuleTargets
}
