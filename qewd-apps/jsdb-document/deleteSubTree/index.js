var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.subscripts === '') {
    return finished({error: 'Empty subscripts value'});
  }

  var global = 'jsdbDocument';
  var subscripts = messageObj.subscripts;

  var doc = this.documentStore.use(global);
  doc.$(subscripts).delete();
  subscripts = ['demo'];

  sendToViewers.call(this, global, subscripts);
  
  finished(doc.getDocument(true));

};