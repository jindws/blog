import moment from 'moment'
let modal =
    `create table if not exists admin(
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(5000) NOT NULL,
     phone DOUBLE,
     email VARCHAR(100),
     is_delete BOOLEAN DEFAULT FALSE,
     create_time DOUBLE,
     PRIMARY KEY ( id )
);`

createTable(modal)

// 新建用户
let create = value => {
  let _sql = `insert into admin set username=?,password=?,phone=?,email=?,create_time=${moment().valueOf()};`
  return query( _sql, value )
}

//查询用户
let login = value=>{
    console.log(value)
    let _sql = "select id from admin where username = ? and password= ?;"
    return query( _sql, value )
}

let detail = value=>{
    let _sql = "select id,username from admin where id= ?;"
    return query( _sql, value )
}

export {
    create,
    login,
    detail,
}
