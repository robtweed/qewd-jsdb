var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.field === '') {
    return finished({error: 'Empty field value'});
  }

  var global = 'jsdbKvs';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);
  doc.enable_kvs();
  doc.kvs.deleteIndex(messageObj.field);
  doc.kvs.reindex();

  sendToViewers.call(this, global, subscripts);
  
  finished({
    ok: true
  });

};