module.exports = function(messageObj, req) {

  //console.log(req);

  var _this = this;
  if (messageObj.ok) {
    setTimeout(function() {
      _this.stop();
    }, 1000);
  }

  return messageObj;

};