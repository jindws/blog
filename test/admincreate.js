const assert = require('assert')
const request = require('./request')

describe('/api/admin/create', ()=> {
    it('should return ', async()=> {
        const re = await request('/api/admin/create',{
            name:'SBC',
            phone:111,
            password:1263875123761273,
        })
        console.log(re)
    });
});
