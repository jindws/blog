const urllib = require('urllib')

const request = async (url,data={})=>{
    url = 'http://localhost:10000'+url
    return new Promise((resolve,reject)=>{
        urllib.request(url,{
            method:'post',
            data,
            headers: {
               'Content-Type': 'application/json',
                // Cookie:'koa_sess=1537854042500-uO8Ua2ujOdy3ck9TAkjDmBCobK0Zdduc',
            },
            dataType: 'json'
        }).then(re=>{
            resolve(re.data)
        }).catch(err=>{
            reject(err)
        })
    })
}


module.exports = request
