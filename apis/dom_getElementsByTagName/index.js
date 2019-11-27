module.exports = function(args, finished) {

  var documentName = args.documentName;
  var doc = this.documentStore.use('domExample', documentName);
  doc.enable_dom();

  var tagName = args.req.query.tagName;
  if (!tagName || tagName === '') {
    return finished({error: 'tagName was not defined'});
  }

  var map = doc.dom.getElementsByTagName(tagName);
  var arr = [];
  map.forEach(function(node) {
    arr.push({
      nodeName: node.nodeName,
      nodeType: node.nodeType,
      text: node.textContent,
      attributes: node.getAttributes()
    });
  });

  finished(arr);

};
