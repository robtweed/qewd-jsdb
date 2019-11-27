var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbList';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);
  doc.enable_list();
  var count = doc.list.count();

  sendToViewers.call(this, global, subscripts);
  
  finished({count: count});

};