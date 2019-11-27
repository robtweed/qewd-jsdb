module.exports = function(args, finished) {

  var documentName = args.documentName;
  var doc = this.documentStore.use('domExample', documentName);
  doc.enable_dom();

  var query = args.req.query.query;
  if (!query || query === '') {
    return finished({error: 'No XPath query was defined'});
  }

  var nodes = doc.dom.xpath(query);
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

  finished(arr);

};
