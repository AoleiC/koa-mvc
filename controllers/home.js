/**
 * 首页
 */

const indexPage = async (ctx) => {
  const article = { title: '共建和谐社会', content: '富强、民主、团结、和谐、奋进，热爱祖国，热爱人民，热爱劳动，热爱学习' }
  ctx.render('index', article)
}

const homePage = async (ctx) => {
  const article = { title: '共建和谐社会', content: '富强、民主、团结、和谐、奋进' }
  ctx.render('index', article)
}

// 测试接口
const testApi = async (ctx) => {
  const article = { title: '共建和谐社会', content: '富强、民主、团结、和谐、奋进' }
  ctx.sendJson(article)
}

module.exports = {
  indexPage,
  homePage,
  testApi,
}
