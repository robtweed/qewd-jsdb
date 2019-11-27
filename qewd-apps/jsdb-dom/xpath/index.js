var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.xpath === '') {
    return finished({error: 'Xpath query is empty'});
  }

  var global = 'jsdbDom';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_dom();

  var nodes = doc.dom.xpath(messageObj.xpath);
  if (!nodes || nodes.length === 0) {
    return finished({error: 'No matching nodes were found'});
  }

  var arr = [];
  nodes.forEach(function(node) {
    var obj = {
      nodeName: node.nodeName,
      nodeType: node.nodeType,
      nodeValue: node.nodeValue
    };
    if (node.nodeType === 1) {
      obj.text = node.textContent;
      obj.attributes = node.getAttributes();
    }
    arr.push(obj);
  });

  sendToViewers.call(this, global, subscripts);
  
  finished(arr);

};