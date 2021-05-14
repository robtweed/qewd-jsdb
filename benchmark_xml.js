var jsdb = require('./jsdb_ydb');
var doc = jsdb.use('exampleDom');
doc.enable_dom();
doc.delete();
var filepath = '/opt/qewd/mapped/benchmark.xml';

var start = Date.now();
doc.dom.parser.parseFile(filepath, function(dom) {
  var elap1 = (Date.now() - start) / 1000;
  console.log(dom.output());
  var elap2 = (Date.now() - start) / 1000;
  console.log('loaded in ' + elap1 + ' sec');
  console.log('and finished after ' + elap2 + ' sec');
  jsdb.close();
});
