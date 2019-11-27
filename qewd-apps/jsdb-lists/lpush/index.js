var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbList';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);
  doc.enable_list();
  var index = doc.list.lpush(messageObj.data);

  sendToViewers.call(this, global, subscripts);
  
  finished({
    index: index
  });

};