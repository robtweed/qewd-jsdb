var sendToViewers = require('../../../utils/sendToViewers');

module.exports = function(messageObj, session, send, finished) {

  var global = 'jsdbRdb';
  var subscripts = ['demo'];

  var sql = 'delete from jsdbdemo';

  if (messageObj.where !== '') {
    pieces = messageObj.where.split('and');
    var and = '';
    sql = sql + ' a where ';
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