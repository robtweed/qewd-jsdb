var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.value === '') {
    return finished({error: 'Empty value'});
  }

  var global = 'jsdbDocument';
  var subscripts = messageObj.subscripts;

  var doc = this.documentStore.use(global, subscripts);
  var json;
  if (doc.hasValue) {
    doc.value = messageObj.value;
  }

  sendToViewers.call(this, global, subscripts);
  
  finished({
    value: messageObj.value
  });

};