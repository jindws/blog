const errors = require('./errors')
// const {AddReturn} = require('../helpers/log')

exports.getResponse = function(success, e) {
    let re
    if (success) {
        re = {
            data: e || {},
            success: true
        };
    } else {
        re = {
            success: false,
            error: (e||""),
            errorMsg: errors[e] || '未知错误！'
        };
    }

    // AddReturn(re)

    return re
};

// 校验手机号码格式是否正确
exports.checkPhone = function(phone){
    if(!phone) return false
    const reg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|166|199|17[3678]|18[0-9]|14[57])[0-9]{8}$/)
    if(!reg.test(+phone)) {
        return false
    }else{
        return true
    }
}

// 获取ip地址
exports.getAcessRealIP = (req) => {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
}

exports.SessStoreUser = async (ctx,next)=>{
    const {id} = ctx.session.admin||{}
    let admin=[]
    if(id){
        admin = await modal.Admin.detail([id])
    }
    ctx.state = {
        admin:admin[0],
        islogin:!!admin[0],
    }
    await next()
}
