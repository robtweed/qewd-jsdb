var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbList';
  var subscripts = ['demo'];

  var doc = this.documentStore.use(global, subscripts);
  doc.enable_list();
  var from = messageObj.from;
  if (from !== '') from = +from;
  var to = messageObj.to;
  if (to !== '') to = +to;
  var ok = doc.list.ltrim(from, to);

  sendToViewers.call(this, global, subscripts);
  
  finished({ok: ok});

};