var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbRdb';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_rdb();

  // create index by_city on jsdbdemo (city, id)

  if (messageObj.name === '') {
    return finished({error: 'Empty index name'});
  }

  if (messageObj.fields === '') {
    return finished({error: 'No index fields specified'});
  }

  var sql = 'create index ' + messageObj.name + ' on jsdbdemo (';
  var comma = '';
  var fields = messageObj.fields.split(',');
  fields.forEach(function(field) {
    sql = sql + comma + field.trim();
    comma = ', ';
  });
  sql = sql + ')';

  //console.log('sql = ' + sql);

  var result = doc.rdb.sql(sql);
  delete result.query;

  sendToViewers.call(this, global, subscripts);
  
  finished(result);

};