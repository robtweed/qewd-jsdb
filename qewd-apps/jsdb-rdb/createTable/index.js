var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbRdb';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_rdb();

  var sql = 'create table jsdbdemo (' +
    'id int not null,' +
    'firstName varchar(255),' +
    'lastName  varchar(255),' +
    'city varchar(255),' +
    'gender varchar(10),' +
    'constraint pk_jsdbdemo primary key (id)' +
  ')';

  var result = doc.rdb.sql(sql);
  delete result.query;

  sendToViewers.call(this, global, subscripts);
  
  finished(result);

};