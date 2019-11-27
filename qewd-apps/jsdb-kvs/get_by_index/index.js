var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.field === '') {
    return finished({error: 'Empty field name'});
  }

  if (messageObj.value === '') {
    return finished({error: 'Empty search value'});
  }

  var global = 'jsdbKvs';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);
  doc.enable_kvs();
  var arr = doc.kvs.get_by_index(messageObj.field, messageObj.value, messageObj.return_data);

  sendToViewers.call(this, global, subscripts);
  
  finished(arr);

};