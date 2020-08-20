/**
 * Koa 自定义中间件
 */

const logger = require('../utils/logger')({ name: 'server/_middleware' })

// 提供返回 json 结果的方法
const send = function () {
  function sendJson (data) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify({
      ret: 0,
      data,
      time: Date.now(),
    })
  }

  function sendError (msg, ret = 400, data = null) {
    this.set('Content-Type', 'application/json')
    logger.warn(`sendError msg=${msg} ret=${ret}`, data)
    this.body = JSON.stringify({
      ret,
      data,
      msg,
      time: Date.now(),
    })
  }

  return async (ctx, next) => {
    ctx.sendJson = sendJson.bind(ctx)
    ctx.sendError = sendError.bind(ctx)
    await next()
  }
}

module.exports = {
  send,
}
