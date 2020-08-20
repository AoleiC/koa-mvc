/**
 * web 入口文件
 */

require('dotenv').config()
const { join } = require('path')
const Koa = require('koa')
const stoppable = require('stoppable')
const KoaBodyParser = require('koa-bodyparser')
const KoaStaticCache = require('koa-static-cache')
const Router = require('koa-router')
const KoaSession = require('koa-session')
const render = require('koa-art-template')

const sysConfig = require('./config')
const logger = require('./utils/logger')({ name: 'web' })
const _middleware = require('./controllers/_middleware')

//路径设置
const basePath = join(__dirname, 'public')
const viewPath = join(__dirname, 'views')

// 设置中间件
const app = new Koa()
app.use(_middleware.send())
app.use(KoaBodyParser({ formLimit: '10mb', jsonLimit: '10mb' }))
app.use(KoaSession(sysConfig.session, app))
app.use(KoaStaticCache(basePath))
render(app, { root: viewPath, extname: '.html', debug: process.env.NODE_ENV !== 'production' })

function shutdown (server) {
  logger.info('Shutting down...')
  server.stop(() => {
    logger.info('Shutdown gracefully.')
    process.exit(0)
  })
}

// supress max listeners warnings
process.setMaxListeners(0)

// 未捕获的异常
process.on('uncaughtException', err => {
  logger.error(`【未捕获的异常】Caught exception:`, err)
})
// promise 错误未处理
process.on('unhandledRejection', (reason, p) => {
  logger.warn('【未处理的 promise 错误】Rejection at:', p, 'reason:', reason)
})
//系统警告
process.on('warning', warning => {
  logger.warn(warning.name) // Print the warning name
  logger.warn(warning.message) // Print the warning message
  logger.warn(warning.stack) // Print the stack trace
})

// 路由
const router = new Router()
const route = require('./controllers/_router')
router.use(route.webRouter.routes())
router.use('/api', route.apiRouter.routes())
app.use(router.routes()).use(router.allowedMethods())

//系统错误
app.on('error', (error) => {
  if (!['read ECONNRESET', 'write ECONNABORTED', 'write ECANCELED'].includes(error.message)) {
    logger.error(error, 'Koa app-level error')
  }
})

const server = stoppable(
  app.listen(sysConfig.port, sysConfig.host, () => {
    logger.info(`Server listening on http://${sysConfig.host}:${sysConfig.port}`)
  }),
)

process.on('SIGTERM', () => shutdown(server))
process.on('SIGINT', () => shutdown(server))
