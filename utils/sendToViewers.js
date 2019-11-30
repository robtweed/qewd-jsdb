var fs = require('fs-extra');

module.exports = function(global, subscripts) {

  var ref = '^' + global + '(';
  var comma = '';
  subscripts = subscripts || [];
  if (subscripts.length > 0) {
    subscripts.forEach(function(subscript) {
      ref = ref + comma + '"' + subscript + '"';
      comma = ',';
    });
    ref = ref + ',';
  }
  ref = ref + '*)';
  var jsdbDocRef = "doc = this.documentStore.use('" + global + "')";
  var jsdbCommand = 'doc';
  if (subscripts && subscripts.length > 0) {
    var subs = JSON.stringify(subscripts);
    if (subscripts.length === 1) subs = "'" + subscripts[0] + "'";
    jsdbCommand = jsdbCommand + '.$(' + subs + ')';
  }
  jsdbCommand = jsdbCommand + '.getDocument(true)';  

  var status = this.db.dbx.function('zwr^qewdInterface', ref);
  var prefix = '/opt/qewd/mapped/';
  if (fs.existsSync('/ISC/dur')) {
    prefix = '';
  }
  var filePath = prefix + 'go-' + process.pid + '.txt';
  if (fs.existsSync(filePath)) {
    var text = fs.readFileSync(filePath, 'utf8');
    fs.removeSync(filePath);

    var json = this.documentStore.use(global, subscripts).getDocument(true);

    var activeSessions = this.sessions.active();
    activeSessions.forEach(function(qewdSession) {
      console.log('session: ' + qewdSession.id);
      if (qewdSession.application === 'jsdb-viewer' && qewdSession.socketId) {
        process.send({
          socketId: qewdSession.socketId,
          type: 'view-test',
          globalRef: ref,
          globalContent: text,
          jsdbDocRef: jsdbDocRef,
          jsdbCommand: jsdbCommand,
          jsonContent: json
        });
      }
    });
  }

};