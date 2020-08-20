/**
 * 日志记录工具
 * 不支持占位符替换的方式 logger.info('%o hello %s', {worldly: 1}, 'world')
 * 只支持 logger.info('hello', {worldly: 1}, 'world') 等用法
 */

const pino = require('pino')
const { isObject } = require('lodash')

class Logger {
  constructor (options) {
    this.logger = pino(options)
  }

  trace () {
    this._log('trace', Array.from(arguments))
  }

  debug () {
    this._log('debug', Array.from(arguments))
  }

  info () {
    this._log('info', Array.from(arguments))
  }

  warn () {
    this._log('warn', Array.from(arguments))
  }

  error () {
    this._log('error', Array.from(arguments))
  }

  fatal () {
    this._log('fatal', Array.from(arguments))
  }

  _log (type, contents) {
    if (contents.length > 2) {
      const context = {}
      let contextCount = 0
      const contentsToLog = []
      contents.forEach(it => {
        if (isObject(it)) {
          contentsToLog.push(`[ctx${contextCount}]`)
          if (it instanceof Error) {
            context[`ctx${contextCount}`] = {
              errorMessage: it.toString(),
              errorStack: it.stack && it.stack.split('\n')
            }
          } else {
            context[`ctx${contextCount}`] = it
          }
          contextCount++
        } else {
          contentsToLog.push(it)
        }
      })

      this.logger.child(context)[type](contentsToLog.join(' '))
    } else {
      const messages = []
      const context = {}
      contents.forEach(it => {
        if (isObject(it)) {
          if (it instanceof Error) {
            Object.assign(context, {
              errorMessage: it.toString(), errorStack: it.stack && it.stack.split('\n')
            })
          } else {
            Object.assign(context, it)
          }
        } else {
          messages.push(it)
        }
      })
      this.logger.child(context)[type](messages.join(' '))
    }
  }
}

function createLogger (options) {
  return new Logger(options)
}

module.exports = createLogger

