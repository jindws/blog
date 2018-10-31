import moment from 'moment'

const modal =
    `create table if not exists article(
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(100) NOT NULL,
     content VARCHAR(5000) NOT NULL,
     type VARCHAR(100),
     create_time DOUBLE NOT NULL,
     is_delete BOOLEAN DEFAULT FALSE,
     create_user_id INT NOT NULL,
     PRIMARY KEY ( id )
);`

createTable(modal)

// 发表文章
const create = value => {
  const _sql = `insert into article set title=?,content=?,type=?,create_user_id=?,create_time=${moment().valueOf()};`
  return query( _sql, value )
}

//查看文章详情
const detail = value=>{
    const _sql = "select title,content,create_time,type,create_user_id from article where id = ?;"
    return query( _sql, value )
}

//文章列表
const list = value=>{
    const _sql = `select id,title,content,create_time,type from article where is_delete=false
        order by create_time desc limit ?,?;`
    return query( _sql, value )
}

const searchlist = value=>{
    const _sql = `select * from article where id in
        (select article_id from articleType where type=? and is_delete=false)
        order by create_time desc limit ?,?;`
    return query( _sql, value )
}
const update = value=>{
    const _sql = "update article SET title=?,content=?,type=? where id = ?";
    return query( _sql, value )
}

const count = (value)=>{
    const _sql = "select count(*) from article where is_delete=false";
    return query( _sql, value )
}

const searchcount = (value)=>{
    const _sql =`select count(*) from article where id in
        (select article_id from articleType where type=? and is_delete=false)`
    return query( _sql, value )
}

const remove = (value)=>{
    const _sql = "update article set is_delete=true where id=?";
    return query( _sql, value )
}

const mylist = (value)=>{
    const _sql = "SELECT * FROM blog.article  where create_user_id = ? order by create_time desc limit ?,?;";
    return query( _sql, value )
}

const mycount = (value)=>{
    const _sql = "SELECT count(*) FROM blog.article where create_user_id = ?;";
    return query( _sql, value )
}

export {
    create,
    detail,
    list,
    searchlist,
    update,
    count,
    searchcount,
    remove,
    mylist,
    mycount,
}
