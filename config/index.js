/***
 * 加载当前环境的配置
 */

require('dotenv').config()
const config = require('./default')

config.isDevEnv = process.env.NODE_ENV === 'dev'
config.isFatEnv = process.env.NODE_ENV === 'fat'
config.isUatEnv = process.env.NODE_ENV === 'uat'
config.isProdEnv = process.env.NODE_ENV === 'production'

// 深度合并对象
const deepObjectMerge = function (FirstOBJ, SecondOBJ) {
  for (let key in SecondOBJ) {
    FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]' ?
      deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key]
  }
  return FirstOBJ
}

console.log(`current node env ${process.env.NODE_ENV}`)
switch (process.env.NODE_ENV) {
  case 'production':
    deepObjectMerge(config, require('./production'))
    break
  default:
    deepObjectMerge(config, require('./local'))
    break
}

module.exports = config
