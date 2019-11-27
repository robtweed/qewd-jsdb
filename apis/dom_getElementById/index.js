module.exports = function(args, finished) {

  var documentName = args.documentName;
  var doc = this.documentStore.use('domExample', documentName);
  doc.enable_dom();

  var id = args.req.query.id;
  if (!id || id === '') {
    return finished({error: 'Id was not defined'});
  }

  var node = doc.dom.getElementById(id);
  if (!node) {
    return finished({error: 'Id ' + id + ' was not found in the DOM'});
  }

  var result = {
    nodeName: node.nodeName,
    nodeType: node.nodeType,
    text: node.textContent,
    attributes: node.getAttributes()
  };

  finished(result);

};
