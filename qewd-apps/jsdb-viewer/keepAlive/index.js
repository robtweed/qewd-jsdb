module.exports = function(messageObj, session, send, finished) {

  // just keeps the QEWD Session alive while the
  // viewer app is displaying in the browser
  
  finished({ok: true});

};