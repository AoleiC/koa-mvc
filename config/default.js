/***
 * 默认的配置
 */

module.exports = {
  // 启动时监听的 ip 和 端口
  host: '0.0.0.0',
  port: '3000',
  session: {
    key: 'ks', //cookie key (default is koa:sess) 默认
    maxAge: 604800000, // cookie 的过期时间 maxAge in ms (default is 1 days)             【需要修改】
    overwrite: true, //是否可以 overwrite (默认 default true)
    httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, //签名默认 true
    rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改 跟下面的二选一】
    renew: true, //等快要到期时重置 ☆前提是你此次请求的session还没有过期 然后在发请求的时候会给你重置为新的  【需要修改】
  }
}
