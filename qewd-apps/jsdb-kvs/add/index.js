var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.key === '') {
    return finished({error: 'Empty key value'});
  }

  var global = 'jsdbKvs';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);
  doc.enable_kvs();
  var ok = doc.kvs.add(messageObj.key, messageObj.data);

  sendToViewers.call(this, global, subscripts);
  
  finished({
    ok: ok
  });

};