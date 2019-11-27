var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.tagName === '') {
    return finished({error: 'tagName is empty'});
  }

  var global = 'jsdbDom';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_dom();

  var nodeList = doc.dom.getElementsByTagName(messageObj.tagName);
  var arr = [];
  nodeList.forEach(function(node) {
    arr.push({
      nodeName: node.nodeName,
      nodeType: node.nodeType,
      text: node.textContent,
      attributes: node.getAttributes()
    });
  });

  sendToViewers.call(this, global, subscripts);
  
  finished(arr);

};