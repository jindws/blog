const assert = require('assert')
const request = require('./request')

describe('/api/admin/login', ()=> {
    it('should return ', async()=> {
        const re = await request('/api/admin/login',{
            phone:'111',
            password:'1263875123761273',
        })
        console.log(re)
    });
});
