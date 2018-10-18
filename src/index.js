const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const serve = require('koa-static');
const logger = require('koa-logger')
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const staticCache = require('koa-static-cache')
const views = require('koa-views')

const app = new Koa()
app.use(bodyParser())
app.use(logger({
  transporter: async(str, args) => {
      const time = args[4]
      if(time){//return
          console.log(moment().format('MM-DD HH:mm:ss'),'<--',args[1],args[2],args[3],time,args[5])
      }else{
          console.log(moment().format('MM-DD HH:mm:ss'),'-->',args[1],args[2])
      }
  }
}))
app.use(serve('.'));

const config = require('./config');

// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  store: new MysqlStore(sessionMysqlConfig)
}))

const {
    SessStoreUser,
} = require('./helpers');

app.use(SessStoreUser)

app.use(views('' , {
  map: {
      html: 'ejs'
  }
}));

// 缓存
app.use(staticCache(path.join(__dirname, './dist'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './image'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))

global.modal = require('./mysql');

const router = require('./routes')
app.use(router.routes(),router.allowedMethods())


app.listen(10000);
console.log('listen',10000)

module.exports = app
