module.exports = function(args, finished) {

  var sql = args.req.query.sql;
  if (!sql || sql === '') {
    return finished({error: 'sql was not defined'});
  }

  if (sql.toLowerCase().startsWith('create ')) {
    return finished({error: 'create table cannot be used with this API - use /jsdb/rdb/table'});
  }

  var result = this.documentStore.sql(sql);

  finished(result);

};
