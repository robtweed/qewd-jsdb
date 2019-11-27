var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbRdb';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_rdb();

  var result = doc.rdb.sql('select * from jsdbdemo');

  sendToViewers.call(this, global, subscripts);
  
  finished(result.data);

};