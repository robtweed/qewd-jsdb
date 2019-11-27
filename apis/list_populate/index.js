var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var documentName = args.documentName;
  var global = 'jsdbList';
  var doc = this.documentStore.use(global, documentName);
  doc.enable_list();

  var ok = true;
  var count = 0;
  var record = {
    field1: '',
    field2: ''
  };

  do {
    count++;
    record.field1 = 'field ' + count;
    record.field2 = 'field ' + (count ** 2);
    console.log(count);
    console.log('record: ' + JSON.stringify(record));
    doc.list.lpush(record);
    if (count > 5) ok = false;
  }
  while (ok);

  ok = true;
  do {
    count++;
    console.log(count);
    record.field1 = 'field ' + count;
    record.field2 = 'field ' + (count ** 2);
    console.log('record: ' + JSON.stringify(record));
    doc.list.rpush(record);
    if (count > 8) ok = false;
  }
  while (ok);

  sendToViewers.call(this, global, [documentName]);

  finished(doc.list.lrange());

};
