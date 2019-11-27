var isEmpty = require('../../utils/isEmpty');

module.exports = function(args, finished) {

  var documentName = args.documentName;
  var doc = this.documentStore.use('domExample', documentName);
  doc.enable_dom();

  var body = args.req.body;
  if (!body || isEmpty(body)) {
    return finished({error: 'No content'});
  }

  doc.dom.parser.parseText(body, function(dom) {
    if (dom.error) {
      finished(dom);
    }
    else {
      finished({ok: true});
    }
  });

};
