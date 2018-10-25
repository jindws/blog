const Router = require('koa-router')
const uuidv1 = require('uuid/v1')
const Upload = require('../controllers/upload')
const exec = require('child_process').exec

const busboy = require('koa-busboy')
const fs = require('fs')


fs.exists('./upload',(have)=>{
    if(!have){
        exec('mkdir upload')
    }
})


const uploader = busboy({
    dest: './upload',
    fnDestFilename: (fieldname, filename) => Date.now().toString(16) + filename
})

const router = Router({
    prefix: '/api/uploadfile'
})

router.post('/',uploader, Upload.create)


module.exports = router
