module.exports = function(args, finished) {

  var global = args.req.query.global;
  if (!global || global === '') {
    return finished({error: 'Global not defined'});
  }
  var doc = this.documentStore.use(global);
  if (!doc.exists) {
    return finished({error: 'Global ' + global + ' does not exist'});
  }

  var keys = args.req.query.keys;
  var subscripts = [];
  if (keys && keys !== '') {
    subscripts = keys.split(',');
  }
  subscripts.forEach(function(subscript, index) {
    subscripts[index] = subscript.trim();
  });

  var dataDoc = doc.$(subscripts);
  if (!dataDoc.exists) {
    var ref = global + '(' + keys + ')';
    return finished({error: 'The global node ' + ref + ' does not exist'});
  }

  if (dataDoc.hasValue) {
    return finished({value: dataDoc.value});
  }

  var useArrays = false;
  if (args.req.query.mapArrays === 'true') useArrays = true;

  finished(dataDoc.getDocument(useArrays));

};
