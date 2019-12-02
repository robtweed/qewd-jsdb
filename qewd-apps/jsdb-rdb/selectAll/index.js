var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbRdb';
  var subscripts = ['demo'];

  var result = this.documentStore.sql('select * from jsdbdemo');

  sendToViewers.call(this, global, subscripts);
  
  finished(result.data);

};