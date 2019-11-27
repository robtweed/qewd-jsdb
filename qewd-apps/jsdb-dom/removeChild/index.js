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

  node.parentNode.removeChild(node, true); // true removes it permanently

  sendToViewers.call(this, global, subscripts);
  
  finished({ok: true});

};