var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.key === '') {
    return finished({error: 'Empty key value'});
  }

  var global = 'jsdbDocument';
  var subscripts = messageObj.subscripts;

  var doc = this.documentStore.use(global, subscripts);
  var json;
  if (doc.hasValue) {
    json = {
      value: doc.value
    };
  }
  else {
    json = doc.getDocument(true);
  }

  sendToViewers.call(this, global, subscripts);
  
  finished({
    exists: doc.exists,
    hasValue: doc.hasValue,
    hasChildren: doc.hasChildren,
    json: json
  });;

};