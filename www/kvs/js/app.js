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
        type: 'clear_down'
      };
      EWD.send(msg, (responseObj) => {
        index = -1;
        nextRecord();
      });
    });


    $('#addBtn').on('click', function(e) {
      var key = $('#add-key').val();

      if (key === "") {
        alert('You must enter a value for the key!');
        return;
      }
      var msg = {
        type: 'add',
        key: key,
        data: record
      };
      EWD.send(msg, (responseObj) => {
        $('#add-response').text(JSON.stringify(responseObj.message, null, 2));
        if (responseObj.message.ok) {
          nextRecord();
        }
        else {
          alert('Unable to add object, probably because the key is already in use');
        }
      });
    });

    $('#editBtn').on('click', function(e) {
      var key = $('#edit-key').val();

      if (key === "") {
        alert('You must enter a value for the key!');
        return;
      }
      var msg = {
        type: 'edit',
        key: key,
        data: record
      };
      EWD.send(msg, (responseObj) => {
        $('#edit-response').text(JSON.stringify(responseObj.message, null, 2));
        if (responseObj.message.ok) {
          nextRecord();
        }
        else {
          alert('Unable to edit object, probably because the key is not in use');
        }
      });
    });

    $('#deleteBtn').on('click', function(e) {
      var key = $('#delete-key').val();

      if (key === "") {
        alert('You must enter a value for the key!');
        return;
      }
      var msg = {
        type: 'delete',
        key: key
      };
      EWD.send(msg, (responseObj) => {
        $('#delete-response').text(JSON.stringify(responseObj.message, null, 2));
        if (!responseObj.message.ok) {
          alert('Unable to delete object, probably because the key is not in use');
        }
      });
    });

    $('#getByKeyBtn').on('click', function(e) {
      var key = $('#getByKey-key').val();

      if (key === "") {
        alert('You must enter a value for the key!');
        return;
      }
      var msg = {
        type: 'get_by_key',
        key: key
      };
      EWD.send(msg, (responseObj) => {
        $('#getByKey-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#addIndexBtn').on('click', function(e) {
      var field = $('#addIndex-field').val();
      var transform = $('#addIndex-transform').val();

      if (field === "") {
        alert('You must enter a value for the index field name!');
        return;
      }
      var msg = {
        type: 'addIndex',
        field: field
      };
      if (transform !== 'none') {
        msg.transform = transform;
      }
      EWD.send(msg, (responseObj) => {
        $('#addIndex-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#getIndicesBtn').on('click', function(e) {
      var msg = {
        type: 'getIndices'
      };
      EWD.send(msg, (responseObj) => {
        $('#getIndices-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#getByIndexBtn').on('click', function(e) {
      var field = $('#getByIndex-field').val();
      var value = $('#getByIndex-value').val();
      var data = $('input[name=getByIndex-data]:checked').val();
      var return_data = (data === 'true');

      if (field === "") {
        alert('You must enter a value for the index field!');
        return;
      }
      if (value === "") {
        alert('You must enter a search value!');
        return;
      }
      var msg = {
        type: 'get_by_index',
        field: field,
        value: value,
        return_data: return_data
      };
      EWD.send(msg, (responseObj) => {
        $('#getByIndex-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#deleteIndexBtn').on('click', function(e) {
      var field = $('#deleteIndex-field').val();

      if (field === "") {
        alert('You must enter a value for the index field name!');
        return;
      }
      var msg = {
        type: 'deleteIndex',
        field: field
      };
      EWD.send(msg, (responseObj) => {
        $('#deleteIndex-response').text(JSON.stringify(responseObj.message, null, 2));
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
    application: 'jsdb-kvs',
    $: $,
    io: io
  });

});
