module.exports = function(args, finished) {

  var documentName = args.documentName;
  var doc = this.documentStore.use('rdbExample', documentName);
  doc.enable_rdb();

  var sql = args.req.query.sql;
  if (!sql || sql === '') {
    return finished({error: 'sql was not defined'});
  }

  var result = doc.rdb.sql(sql);

  finished(result);

};
