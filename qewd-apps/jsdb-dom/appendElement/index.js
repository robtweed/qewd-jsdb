var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var id = messageObj.id;
  if (id === '') {
    return finished({error: 'Id is empty'});
  }

  var global = 'jsdbDom';
  var subscripts = ['demo'];
  var doc = this.documentStore.use(global, subscripts);
  doc.enable_dom();

  var documentNode;
  var node;

  if (id === '#document') {
    if (!doc.exists) {
      node = doc.dom.createDocument();
    }
    else {
      if (doc.dom.documentElement !== null) {
        return finished({error: 'DOM already has a Document Element'});
      }
      node = doc.dom.documentNode;
    }
  }
  else {
    if (id[0] === '#') {
      node = doc.dom.getElementById(id.substr(1));
      if (!node) {
        return finished({error: 'Id ' + messageObj.id + ' was not found in the DOM'});
      }
    }
    else {
      var nodes = doc.dom.xpath(id);
      if (nodes.length === 0) {
        return finished({error: 'XPath ' + id + ' did not find any nodes'});
      }
      node = nodes[0];
      if (node.nodeType !== 1) {
        return finished({error: 'XPath ' + id + ' did not return an element node'});
      }
    }
  }

  node.appendElement({
    tagName: messageObj.tagName,
    attributes: messageObj.attributes,
    text: messageObj.text
  });

  sendToViewers.call(this, global, subscripts);
  
  finished({ok: true});

};