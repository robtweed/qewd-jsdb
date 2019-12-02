var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbRdb';
  var subscripts = ['demo'];

  var sql = 'select ';
  var pieces;
  var fields = messageObj.fields;
  if (fields === '') {
    sql = sql + '* from jsdbdemo';
  }
  else {
    pieces = fields.split(',');
    var comma = '';
    pieces.forEach(function(field) {
      sql = sql + comma + 'a.' + field.trim();
      comma = ',';
    });
    sql = sql + ' from jsdbdemo a';
  }

  if (messageObj.where !== '') {
    pieces = messageObj.where.split('and');
    var and = '';
    sql = sql + ' where ';
    pieces.forEach(function(condition) {
      sql = sql + and + 'a.' + condition.trim();
      and = ' and ';
    });
  }

  //console.log('sql = ' + sql);

  var result = this.documentStore.sql(sql);

  sendToViewers.call(this, global, subscripts);
  
  finished(result.data);

};