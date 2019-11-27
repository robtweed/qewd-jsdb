var isEmpty = require('../../utils/isEmpty');

module.exports = function(args, finished) {

  var body = args.req.body;
  if (!body || isEmpty(body)) {
    return finished({error: 'No content'});
  }

  var global = args.req.query.global;
  if (!global || global === '') {
    return finished({error: 'Global not defined'});
  }
  var doc = this.documentStore.use(global);
  var keys = args.req.query.keys;
  var subscripts = [];
  if (keys && keys !== '') {
    subscripts = keys.split(',');
  }
  subscripts.forEach(function(subscript, index) {
    subscripts[index] = subscript.trim();
  });

  var dataDoc = doc.$(subscripts);

  dataDoc.setDocument(body);

  finished({ok: true});

};
