var isEmpty = require('../../utils/isEmpty');
var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var documentName = args.documentName;
  var global = 'jsdbKvs';
  var doc = this.documentStore.use(global, documentName);
  doc.enable_kvs();

  var data = doc.kvs.get_by_key(args.key);

  sendToViewers.call(this, global, subscripts);

  if (isEmpty(data)) {
    finished({error: 'No record found with that key'});
  }
  else {
    finished(data);
  }

};
