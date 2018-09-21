const React = require('react')
const renderToString = require('react-dom/server').renderToString
const StaticRouter = require('react-router-dom').StaticRouter
const App = require('../../app/pages').default
const template = require('../template')
const Index = ctx => {
    const context = {}
    const body = renderToString(
        <StaticRouter location={ctx.request.url} context={context}>
          <App/>
        </StaticRouter>
     )

    ctx.body = template({
      body,
      title: 'blog',
    })
}

module.exports = {
    Index
}
