var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.key === '') {
    return finished({error: 'Empty key value'});
  }

  var global = 'jsdbKvs';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);
  doc.enable_kvs();
  var obj = doc.kvs.get_by_key(messageObj.key);

  sendToViewers.call(this, global, subscripts);
  
  finished(obj);

};