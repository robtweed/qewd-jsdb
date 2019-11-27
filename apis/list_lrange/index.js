var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var documentName = args.documentName;
  var global = 'jsdbList';
  var doc = this.documentStore.use(global, documentName);
  doc.enable_list();

  var results = doc.list.lrange(args.req.query.from, args.req.query.to);

  sendToViewers.call(this, global, [documentName]);

  finished(results);

};
