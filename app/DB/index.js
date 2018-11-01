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
        url       : '/api/article/detail/:id',
        method    : 'get',
    },
    Remove:{
        url       : '/api/article/remove',
        method    : 'DELETE',
    },
    MyList:{
        url       : '/api/article/mylist',
        method    : 'POST',
    },
});

DBF.create('Admin', {
    Login:{
        url       : '/api/admin/login',
        method    : 'POST',
    },
    Logout:{
        url       : '/api/admin/logout',
        method    : 'POST',
    },
    Create:{
        url       : '/api/admin/create',
        method    : 'POST',
    },
    Message:{
        url       : '/api/admin/message',
        method    : 'POST',
    }
});

DBF.create('Type', {
    List:{
        url       : '/api/type/list',
        method    : 'POST',
    },

});
