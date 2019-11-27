var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var documentName = args.documentName;
  var global = 'jsdbKvs';
  var doc = this.documentStore.use(global, documentName);
  doc.enable_kvs();

  var data = {
    rtweed: {
      firstName: 'Rob',
      lastName: 'Tweed',
      town: 'Redhill'
    },
    stweed: {
      firstName: 'Simon',
      lastName: 'Tweed',
      town: 'St Albans'
    },
    ssalling: {
      firstName: 'Susanne',
      lastName: 'Salling',
      town: 'Redhill'
    },
    cmunt: {
      firstName: 'Chris',
      lastName: 'Munt',
      town: 'Banstead'
    }
  };

  for (var key in data) {
    doc.kvs.add(key, data[key]);
  }

  sendToViewers.call(this, global, subscripts);

  finished({ok: true});

};
