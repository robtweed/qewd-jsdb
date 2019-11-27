var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbDom';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_dom();

  var json = doc.dom.outputAsJSON(+messageObj.indent);

  sendToViewers.call(this, global, subscripts);
  
  finished({json: json});

};