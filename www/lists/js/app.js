var test_data = [
  {
    firstName: 'Rob',
    lastName: 'Tweed',
    city: 'Redhill',
    gender: 'Male'
  },
  {
    firstName: 'Simon',
    lastName: 'Tweed',
    city: 'St Albans',
    gender: 'Male'
  },
  {
    firstName: 'Susanne',
    lastName: 'Salling',
    city: 'Redhill',
    gender: 'Female'
  },
  {
    firstName: 'Chris',
    lastName: 'Munt',
    city: 'Banstead',
    gender: 'Male'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'London',
    gender: 'Female'
  },
  {
    firstName: 'Ian',
    lastName: 'Jones',
    city: 'Edinburgh',
    gender: 'Male'
  },
  {
    firstName: 'Michael',
    lastName: 'Ryan',
    city: 'Leeds',
    gender: 'Male'
  }
];

$(document).ready(function() {

  var index = -1;
  var record;

  function nextRecord() {
    index++;
    record = test_data[index];
    $('#record').text(JSON.stringify(record, null, 2));
  }

  nextRecord();

  EWD.on('ewd-registered', function() {

    $('#clearBtn').on('click', function(e) {
      var msg = {
        type: 'delete'
      };
      EWD.send(msg, (responseObj) => {
        index = -1;
        nextRecord();
        $('#lpush-response').text('');
        $('#rpush-response').text('');
      });
    });

    $('#countBtn').on('click', function(e) {
      var msg = {
        type: 'count'
      };
      EWD.send(msg, (responseObj) => {
        $('#count-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#lpushBtn').on('click', function(e) {
      var msg = {
        type: 'lpush',
        data: record
      };
      EWD.send(msg, (responseObj) => {
        $('#lpush-response').text(JSON.stringify(responseObj.message, null, 2));
        nextRecord(); 
      });
    });

    $('#rpushBtn').on('click', function(e) {
      var msg = {
        type: 'rpush',
        data: record
      };
      EWD.send(msg, (responseObj) => {
        $('#rpush-response').text(JSON.stringify(responseObj.message, null, 2));
        nextRecord(); 
      });
    });


    $('#insertBeforeBtn').on('click', function(e) {
      var position = $('#insertBefore-position').val();

      if (position < 0) {
        alert('Only use positive values!');
        return;
      }

      var msg = {
        type: 'insert_before',
        position: position,
        data: record
      };
      EWD.send(msg, (responseObj) => {
        $('#insertBefore-response').text(JSON.stringify(responseObj.message, null, 2));
        nextRecord(); 
      });
    });


    $('#lpopBtn').on('click', function(e) {
      var msg = {
        type: 'lpop'
      };
      EWD.send(msg, (responseObj) => {
        $('#lpop-response').text(JSON.stringify(responseObj.message, null, 2));
        // put the returned record to the end of the test data again so it can be re-used 
        test_data.push(responseObj.message);
      });
    });

    $('#rpopBtn').on('click', function(e) {
      var msg = {
        type: 'rpop'
      };
      EWD.send(msg, (responseObj) => {
        $('#rpop-response').text(JSON.stringify(responseObj.message, null, 2));
        // put the returned record to the end of the test data again so it can be re-used 
        test_data.push(responseObj.message);
      });
    });

    $('#lrangeBtn').on('click', function(e) {
      var from = $('#lrange-from').val();
      var to = $('#lrange-to').val();

      if (from !== '' && to !=='' && to < from) {
        alert('The from value must be less than the to value!');
        return;
      }

      if (from < 0 || to < 0) {
        alert('Only use positive values!');
        return;
      }

      var msg = {
        type: 'lrange',
        from: from,
        to: to
      };
      EWD.send(msg, (responseObj) => {
        $('#lrange-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });


    $('#ltrimBtn').on('click', function(e) {
      var from = $('#ltrim-from').val();
      var to = $('#ltrim-to').val();

      if (from !== '' && to !=='' && to < from) {
        alert('The from value must be less than the to value!');
        return;
      }

      if (from < 0 || to < 0) {
        alert('Only use positive values!');
        return;
      }

      var msg = {
        type: 'ltrim',
        from: from,
        to: to
      };
      EWD.send(msg, (responseObj) => {
        $('#ltrim-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    // keep session alive

    setInterval(function() {
      EWD.send({
        type: 'keepAlive'
      });
    }, 60000);

  });

  EWD.start({
    application: 'jsdb-lists',
    $: $,
    io: io
  });

});
