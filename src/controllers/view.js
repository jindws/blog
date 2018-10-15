const React = require('react')
const renderToString = require('react-dom/server').renderToString
const StaticRouter = require('react-router-dom').StaticRouter
const App = require('../../app/pages').default
const template = require('../template')

const Index = ctx => {
    const context = {}

    let body = renderToString(
        <StaticRouter
            location={ctx.request.url}
            context={context}>
          <App path = {ctx.request.url}/>
        </StaticRouter>
     )

    ctx.body = template({
      body,
      title: 'blog',
    })
}

const Operate = async ctx=>{
    const {id=''} = ctx.params

    const {isLogin} = ctx.state

    if(!isLogin){
        ctx.redirect('/login')
        return
    }

    const list = await modal.Type.list()
    await ctx.render('operate',{
        id,
        typelist:list.map(itm=>itm.name),
    })
}

module.exports = {
    Index,
    Operate,
}
