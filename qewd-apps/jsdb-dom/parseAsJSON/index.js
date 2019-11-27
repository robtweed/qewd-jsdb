var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbDom';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_dom();
  var status = doc.dom.parseJSON(messageObj.json);

  if (status && status.error) {
    return finished(status);
  }

  sendToViewers.call(this, global, subscripts);
  finished({ok: true});
};