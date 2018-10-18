let modal =
    `create table if not exists articleType(
     id INT NOT NULL AUTO_INCREMENT,
     article_id INT NOT NULL,
     type VARCHAR(100) NOT NULL,
     is_delete BOOLEAN DEFAULT FALSE,
     create_time DOUBLE NOT NULL,
     PRIMARY KEY ( id )
);`

createTable(modal)

let create = value => {
  let _sql = `insert into articleType set article_id=?,type=?,create_time=${Date.now()};`
  return query( _sql, value )
}

let remove = value => {
  let _sql = `update articleType SET is_delete = true where article_id=?;`
  return query( _sql, value )
}

let list = value => {
  // let _sql = `select * from article where article.id in
  //           (select articleType.article_id from articleType where is_delete = false and articleType.type=?) order by article.id desc;`
  let _sql = "SELECT type, count(*) AS sum FROM blog.articleType  GROUP BY type order by sum desc;"
  return query( _sql, value )
}




export {
    create,
    list,
    remove,
}