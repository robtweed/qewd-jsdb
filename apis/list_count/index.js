var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var documentName = args.documentName;
  var global = 'jsdbList';
  var doc = this.documentStore.use(global, documentName);
  doc.enable_list();

  var count = doc.list.count();

  sendToViewers.call(this, global, [documentName]);

  finished({count: count});

};
