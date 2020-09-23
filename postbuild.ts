import fs from 'fs'

/**
 * 트랜스파일이 필요없는 모듈명의 정규식이 담깁니다.
 */
const ignoredTranspilePatterns = [
  // * 프로미스 및 트랜스파일러 관련
  /^core-js.?/,
  /^@babel.?/,
  'bluebird',
  'util.promisify',
  'object-assign',
  'define-properties',
  'loader-utils',

  // * 뷰 & 넉스트
  /^@nuxt.?/,
  'nuxt'
]

/**
 * 모듈 명이 중복되지 않고 지양되지 않는지를 검사합니다.
 */
const checkModuleNameValid = (params: {
  moduleName: string
  moduleNames: string[]
  ignoredTranspilePatterns: (string | RegExp)[]
}) => {
  // * 모듈 명이 이미 모듈명 목록에 포함되어 있으면 false 를 반환합니다.
  if (params.moduleNames.includes(params.moduleName)) return false

  // * 모듈 명이 지양패턴에 매칭되면 false 를 반환합니다.
  let isIgnored = false
  for (const ignoreRegex of ignoredTranspilePatterns) {
    if (new RegExp(ignoreRegex).test(params.moduleName)) {
      isIgnored = true
      break
    }
  }
  if (isIgnored) return false
  return true
}

/**
 * 번들링 되어야하는 모듈 이름 목록을 수집합니다.
 * @param ignoreRegexs
 */
const getDependencies = (ignoredTranspilePatterns: (string | RegExp)[]) => {
  const packageJson = require('./package.json')
  const dependencyNames = Object.keys(packageJson.dependencies)
  const result = []
  for (const dependencyName of dependencyNames) {
    if (
      checkModuleNameValid({
        moduleName: dependencyName,
        ignoredTranspilePatterns,
        moduleNames: result
      })
    ) {
      result.push(dependencyName)
    }
  }
  return result
}

/**
 * 재귀 호출을 통해 주어진 경로에 하위폴더들의 목록을 얻어옵니다.
 * @param staticPath
 * @param subPath
 */
const collectSubFolderList = (
  staticPath: string,
  subPath = '/',
  ignoredTranspilePathPatterns: (string | RegExp)[]
) => {
  const files = fs.readdirSync(staticPath)
  const folders = [{ subPath, staticPath }]

  for (const file of files) {
    const checkPath = staticPath + '/' + file
    const stats = fs.statSync(checkPath)
    if (!stats.isDirectory()) continue

    // * 지양할 폴더경로 패턴과 일치하다면 배제합니다.
    let isIgnored = false
    for (const ignoreRegex of ignoredTranspilePathPatterns) {
      if (new RegExp(ignoreRegex).test(checkPath)) {
        isIgnored = true
        break
      }
    }
    if (isIgnored) continue

    const collectedDatas = collectSubFolderList(
      checkPath,
      subPath + file + '/',
      ignoredTranspilePathPatterns
    )

    for (const collectedData of collectedDatas) folders.push(collectedData)
  }

  return folders
}

/**
 * 빌드 후 바벨을 적용할 대상을 수집합니다.
 */
export const postbuild = () => {
  /**
   * 바벨을 적용할 모듈명이 담긴 목록입니다.
   */
  let moduleNamesOfNeedToBeTranspile: string[] = []
  /**
   * 프로덕션에 사용되는 모듈 명 목록입니다.
   */
  const productionModuleNames = getDependencies(ignoredTranspilePatterns)

  for (const productionModuleName of productionModuleNames) {
    const packageJsonPath = `./node_modules/${productionModuleName}`
    moduleNamesOfNeedToBeTranspile = [...moduleNamesOfNeedToBeTranspile]
  }

  return moduleNamesOfNeedToBeTranspile
}

export default postbuild
