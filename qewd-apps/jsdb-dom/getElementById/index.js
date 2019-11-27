var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  if (messageObj.id === '') {
    return finished({error: 'Id is empty'});
  }

  var global = 'jsdbDom';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_dom();

  var node = doc.dom.getElementById(messageObj.id);
  if (!node) {
    return finished({error: 'Id ' + messageObj.id + ' was not found in the DOM'});
  }

  var result = {
    nodeName: node.nodeName,
    nodeType: node.nodeType,
    text: node.textContent,
    attributes: node.getAttributes()
  };

  sendToViewers.call(this, global, subscripts);
  
  finished(result);

};