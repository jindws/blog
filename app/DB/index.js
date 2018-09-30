const DBF =require('dbfac')

module.exports = DBF

DBF.create('Article', {
    Create: {
        url       : '/api/article/create',
        method    : 'POST',
    },
    Update: {
        url       : '/api/article/update',
        method    : 'POST',
    },
    List:{
        url       : '/api/article/list',
        method    : 'POST',
    },
    Detail:{
        url       : '/api/article/detail',
        method    : 'POST',
    }
});
