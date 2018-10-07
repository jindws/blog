let modal =
    `create table if not exists type(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     create_time DOUBLE NOT NULL,
     is_delete BOOLEAN DEFAULT FALSE,
     PRIMARY KEY ( id )
);`

createTable(modal)

// 发表文章
let create = value => {
  let _sql = `insert into type set name=?,create_time=${Date.now()};`
  return query( _sql, value )
}

let list = value=>{
    let _sql = "select name from type where is_delete=false order by create_time desc;"
    return query( _sql, value )
}

export {
    create,
    list,
}
