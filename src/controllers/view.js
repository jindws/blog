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
            // location={{ pathname: '/detail/1' }}
            // basename="/calendar"
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
    let detail=[{
        title:'',
        content:'',
    }]
    if(id){
        detail = await modal.Article.detail([id])
    }
    await ctx.render('operate',{
        detail:detail[0],
        id,
    })
}

module.exports = {
    Index,
    Operate,
}
