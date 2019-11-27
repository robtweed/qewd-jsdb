var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbDom';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_dom();
  var _this = this;
  doc.dom.parser.parseText(messageObj.xml, function(dom) {
    if (dom.error) {
      finished(dom);
    }
    else {
      sendToViewers.call(_this, global, subscripts);
      finished({ok: true});
    }
  });

};