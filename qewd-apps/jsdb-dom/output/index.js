var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbDom';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_dom();

  var xml = doc.dom.output(+messageObj.indent);

  sendToViewers.call(this, global, subscripts);
  
  finished({xml: xml});

};