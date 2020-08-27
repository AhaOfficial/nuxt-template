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
    for (const dependency of dependencies) {
      let isIgnored = false
      for (const ignoreRegex of ignoreRegexs) {
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
    const files = fs.readdirSync(staticPath)
    const folders = [{ subPath, staticPath }]

    for (const file of files) {
      const checkPath = staticPath + '/' + file
      const stats = fs.statSync(checkPath)
      if (!stats.isDirectory()) continue

      if (!exceptionList.includes(checkPath)) continue
      const collectedDatas = collect(checkPath, subPath + file + '/')

      for (const collectedData of collectedDatas) folders.push(collectedData)
    }

    return folders
  }

  const find = staticPath => {
    const folders = []

    for (const folder of collect(staticPath)) if (fs.existsSync(folder.staticPath + `/package.json`)) folders.push(folder.staticPath)

    return folders
  }

  const patch = staticPath => {
    const folders = find(staticPath)

    let moduleNames = []
    for (const folderName of folders) {
      const stats = fs.statSync(folderName)
      if (!stats.isDirectory()) continue

      try {
        const packageFilePath = `${folderName}/package.json`
        const packageFileData = JSON.parse(String(fs.readFileSync(packageFilePath)))
        if (packageFileData.name !== undefined) moduleNames.push(packageFileData.name)
        moduleNames = [...moduleNames, ...Object.keys(packageFileData.dependencies)]
      } catch (e) {}
    }
    return moduleNames
  }

  let babelModuleTargets: string[] = []
  for (const module of targetNonDevModules) {
    const targetPath = `./node_modules/${module}`
    babelModuleTargets = [...babelModuleTargets, ...patch(targetPath)]
  }
  return babelModuleTargets
}
