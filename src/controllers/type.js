const {
    getResponse
} = require('../helpers')

const List = async ctx=>{
    const list = await modal.ArticleType.list()
    ctx.body = getResponse(true,{
        list
    })
}

module.exports = {
    List,
}
