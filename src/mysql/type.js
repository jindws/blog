import moment from 'moment'

let modal =
    `create table if not exists type(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL UNIQUE,
     create_time DOUBLE NOT NULL,
     PRIMARY KEY ( id )
);`

createTable(modal)

// 发表文章
let create = value => {
  let _sql = `replace into type set name=?,create_time=${moment().valueOf()};`
  return query( _sql, value )
}

let clean = value => {
  // let _sql = `delete type where type.name not in (select articleType.type from articleType where is_delete = false);`
  return query( _sql, value )
}


// 文章列表
let list = value=>{
    let _sql = "select name from type order by name desc;"
    return query( _sql, value )
}

export {
    create,
    list,
}
