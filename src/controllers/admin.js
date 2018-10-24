const {
    getResponse
} = require('../helpers')

const Create = async ctx=>{
    let {body} = ctx.request
    let {
        username,
        password,
        phone,
        email
    } = body

    username =username.trim()

    if(!username||!password){
        ctx.body = getResponse(false,'e001')
        return
    }

     try {
         var re = await modal.Admin.create([username,password,phone,email])
     } catch (e) {
         console.log(e)
     }

     if(re){
         ctx.session.admin = {
             username,
             id:re.insertId,
         }
         ctx.body = getResponse(true,'操作成功')
     }else{
         ctx.body = getResponse(false,'e102')
     }
}

const Login = async ctx=>{
    let {body} = ctx.request
    let {
        username,
        password,
    } = body
    if(!username||!password){
        ctx.body = getResponse(false,'e001')
        return
    }

    const admin = await modal.Admin.login([username,password])
    console.log(admin)
    if(!admin[0]){
        ctx.body = getResponse(false,'e101')
        return
    }

    ctx.body = getResponse(true,'登录成功')

    ctx.session.admin = admin[0]
}

const Message = async ctx=>{
    let {admin} = ctx.state

    if(admin){
        return ctx.body = getResponse(true,{
            username:admin.username
        })
    }
    ctx.body = getResponse(false,'e201')
}

const Logout = async ctx=>{
    Reflect.deleteProperty(ctx,'session')
    ctx.body = getResponse(true,'操作成功')
}

module.exports = {
    Create,
    Login,
    Message,
    Logout,
}
