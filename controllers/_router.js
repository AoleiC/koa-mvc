/**
 * 所有路由的定义
 */

const Router = require('koa-router')
const webRouter = new Router()
const apiRouter = new Router()
const home = require( './home')

// 首页
webRouter.get('/', home.indexPage)
webRouter.get('/home', home.homePage)

apiRouter.get('/test', home.testApi)

module.exports = {
  webRouter,
  apiRouter,
}
