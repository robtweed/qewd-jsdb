var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var documentName = args.documentName;
  var global = 'jsdbKvs';
  var doc = this.documentStore.use(global, documentName);
  doc.enable_kvs();

  var results = doc.kvs.get_by_index(args.indexName, args.value, args.req.query.data);

  sendToViewers.call(this, global, subscripts);

  if (!results) {
    finished({error: 'No such index'});
  }
  else {
    finished(results);
  }

};
