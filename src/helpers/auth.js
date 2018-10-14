const {
    getResponse
} = require('../helpers')

exports.checkLogin = async(ctx,next) => {
    if(!ctx.state.islogin){
        ctx.body = getResponse(false,'e201')
        return
    }
    await next()
}

exports.ifarticleauthor = async(ctx,next) => {
    let {body} = ctx.request
    let {
        id,//articleId
    } = body
    const {admin} = ctx.state
    const detail = await modal.Article.detail([id])
    if(detail.create_user_id !== admin.id){
        ctx.body = getResponse(false,'e202')
        return
    }
    await next()
}
