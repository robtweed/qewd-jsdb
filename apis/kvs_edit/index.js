var isEmpty = require('../../utils/isEmpty');
var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var documentName = args.documentName;
  var global = 'jsdbKvs';
  var doc = this.documentStore.use(global, documentName);
  doc.enable_kvs();

  var body = args.req.body;
  if (!body || isEmpty(body)) {
    return finished({error: 'No content'});
  }

  var status = doc.kvs.edit(args.key, body);

  sendToViewers.call(this, global, subscripts);

  finished({ok: status});

};
