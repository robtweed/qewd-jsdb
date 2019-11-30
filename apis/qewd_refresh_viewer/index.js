var sendToViewers = require('../../utils/sendToViewers');

module.exports = function(args, finished) {

  var global = args.req.query.global;
  if (!global || global === '') {
    return finished({error: 'No global specified'});
  }
  var subList = args.req.query.subscripts;
  var subscripts;
  if (subList && subList !== '') {
    subscripts = [];
    var pieces = subList.split(',');
    pieces.forEach(function(piece) {
      subscripts.push(piece.trim());
    });
  }

  sendToViewers.call(this, global, subscripts);
  finished({ok: true});
};
