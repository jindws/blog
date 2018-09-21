const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const serve = require('koa-static');
// const logger = require('koa-logger')

const app = new Koa()
app.use(bodyParser())
// app.use(logger())
app.use(serve('.'));

const router = require('./routes')
app.use(router.routes(),router.allowedMethods())

app.listen(10000);

module.exports = app
