$(document).ready(function() {

    EWD.on('ewd-registered', function() {
      EWD.log = true;

      EWD.on('view-test', function(message) {
        $('#globalRef').text(message.globalRef);
        $('#globalContent').text(message.globalContent);
        $('#jsdbDocRef').text(message.jsdbDocRef);
        $('#jsdbCommand').text(message.jsdbCommand);
        $('#jsonContent').text(JSON.stringify(message.jsonContent, null, 2));
      });

      // keep session alive

      setInterval(function() {
        EWD.send({
            type: 'keepAlive'
          }, function(responseObj) {
        });
      }, 60000);

    });

  EWD.start({
    application: 'jsdb-viewer',
    $: $,
    io: io
  });

});
