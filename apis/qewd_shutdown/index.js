module.exports = function(args, finished) {

  //console.log(JSON.stringify(args, null, 2));
  //console.log(this);

  if (!args.req.ip.includes(':172.')) {
    return finished({error: 'Invalid request (1)'});
  }
  var auth = args.req.headers.authorization;
  if (!auth || auth === '' || !auth.startsWith('Basic ')) {
    return finished({error: 'Invalid request (2)'});
  }

  auth = Buffer.from(auth.split("Basic ")[1], 'base64').toString();
  console.log('auth = ' + auth);
  var pieces = auth.split(':');
  var secret = this.jwt.secret;
  var password = this.userDefined.config.managementPassword;
  if (secret !== pieces[1] || password !== pieces[0]) {
    return finished({error: 'Invalid request (3)'});
  }

  finished({ok: true});
};
