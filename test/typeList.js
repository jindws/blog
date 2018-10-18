const assert = require('assert')
const request = require('./request')

describe('/api/type/list', ()=> {
    it('类别列表', async()=> {
        const re = await request('/api/type/list')
        console.log(re)
    });
});
