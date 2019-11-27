var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbRdb';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_rdb();

  var data = messageObj.data;
  console.log('data: ' + JSON.stringify(data, null, 2));
  var sql = 'insert into jsdbdemo (id, firstName, lastName, city, gender) values (';
  var comma = '';
  for (var name in data) {
    sql = sql + comma + "'" + data[name] + "'";
    comma = ',';
  }
  sql = sql + ')';

  //console.log('sql = ' + sql);

  var result = doc.rdb.sql(sql);
  delete result.query;

  sendToViewers.call(this, global, subscripts);
  
  finished(result);

};