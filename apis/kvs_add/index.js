var isEmpty = require('../../utils/isEmpty');
var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var body = args.req.body;
  if (!body || isEmpty(body)) {
    return finished({error: 'No content'});
  }

  var documentName = args.documentName;
  var global = 'jsdbKvs';
  var doc = this.documentStore.use(global, documentName);
  doc.enable_kvs();

  doc.kvs.add(args.key, body);

  sendToViewers.call(this, global, subscripts);

  finished({ok: true});

};
