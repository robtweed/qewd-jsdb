var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var documentName = args.documentName;
  var global = 'jsdbKvs';
  var doc = this.documentStore.use(global, documentName);
  doc.enable_kvs();

  doc.kvs.deleteIndex(args.indexName);
  doc.kvs.reindex();

  sendToViewers.call(this, global, subscripts);

  finished({ok: true});

};
