const {
    getResponse
} = require('../helpers')

const Create = async ctx=>{
    let {body} = ctx.request
    let {
        title,
        content='',
        type=[]
    } = body
    if(!title){
        ctx.body = getResponse(false,'e001')
        return
    }

    type = [...new Set(type.map(it=>it.trim()))]
    const {admin} = ctx.state
    console.log(11,admin)
    await modal.Article.create([
        title,
        content,
        type.join(),
        admin.id,
    ])
    ctx.body = getResponse(true,'操作成功')

    CType(type)
}

const CType = async type=>{
    let typelist = await modal.Type.list()
    typelist = typelist.map(itm=>itm.name)
    for (let it of type) {
        if(!typelist.includes(it)){
            await modal.Type.create([it])
        }
    }
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
    let detail = await modal.Article.detail([id])
    if(!detail[0]){
        ctx.body = getResponse(false,'e002')
        return
    }

    detail = detail[0]

    const {admin={}} = ctx.state

    const {create_user_id} = detail

    const author = detail.create_user_id&&detail.create_user_id === admin.id

    ctx.body = getResponse(true,{
        ...detail,
        author,
    })
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
    let {
        id,
        title,
        content='',
        type=[],
    } = body
    if(!title||!id){
        ctx.body = getResponse(false,'e001')
        return
    }

    type = [...new Set(type.map(it=>it.trim()))]
    await modal.Article.update([title,content,type,id])
    ctx.body = getResponse(true,'操作成功')
    CType(type)
}

module.exports = {
    Create,
    Detail,
    List,
    Update,
}
