const {
    getResponse
} = require('../helpers')

const Create = async ctx=>{
    let {body} = ctx.request
    const {
        title,
        content='',
    } = body
    if(!title){
        ctx.body = getResponse(false,'e001')
        return
    }
    await modal.Article.create([title,content,Date.now()])
    ctx.body = getResponse(true,'操作成功')
}

const Detail = async ctx=>{
    let {body} = ctx.request
    const {
        id
    } = body
    if(!id){
        ctx.body = getResponse(false,'e001')
        return
    }
    const detail = await modal.Article.detail([id])
    if(!detail[0]){
        ctx.body = getResponse(false,'e002')
        return
    }
    ctx.body = getResponse(true,detail[0])
}

const List = async ctx=>{
    let {body} = ctx.request
    const {
        pageSize=10,
        pageNum=1,
    } = body
    const list = await modal.Article.list([(+pageNum-1)*+pageSize,pageSize])
    const count = await modal.Article.count()

    ctx.body = getResponse(true,{
        list,
        count:count[0]['count(*)'],
    })
}

const Update = async ctx=>{
    let {body} = ctx.request
    const {
        id,
        title,
        content='',
    } = body
    if(!title||!id){
        ctx.body = getResponse(false,'e001')
        return
    }
    await modal.Article.update([title,content,id])
    ctx.body = getResponse(true,'操作成功')
}

module.exports = {
    Create,
    Detail,
    List,
    Update,
}
