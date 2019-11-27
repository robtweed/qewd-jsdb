var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbList';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);
  doc.enable_list();
  var index = doc.list.insert_before(+messageObj.position, messageObj.data);

  sendToViewers.call(this, global, subscripts);
  
  finished({index: index});

};