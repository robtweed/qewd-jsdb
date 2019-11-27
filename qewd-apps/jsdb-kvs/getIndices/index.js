var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbKvs';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);
  doc.enable_kvs();
  var arr = doc.kvs.getIndices();

  sendToViewers.call(this, global, subscripts);
  
  finished(arr);

};