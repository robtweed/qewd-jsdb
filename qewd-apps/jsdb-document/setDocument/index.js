var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbDocument';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);

  if (doc.exists) {
    return finished({error: 'Document already exists'});
  }

  var ok = doc.setDocument(messageObj.data);

  sendToViewers.call(this, global, subscripts);
  
  finished({
    ok: ok
  });

};