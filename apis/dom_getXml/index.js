module.exports = function(args, finished) {

  var documentName = args.documentName;
  var doc = this.documentStore.use('domExample', documentName);
  if (!doc.exists) {
    return finished({error: 'DOM ' + documentName + ' does not exist'});
  }
  doc.enable_dom();

  var xml = doc.dom.output(args.req.query.indentation);
  finished({xml: xml});

};
