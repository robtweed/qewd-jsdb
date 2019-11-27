var test_data = [
  {
    id: 1,
    firstName: 'Rob',
    lastName: 'Tweed',
    city: 'Redhill',
    gender: 'Male'
  },
  {
    id: 2,
    firstName: 'Simon',
    lastName: 'Tweed',
    city: 'St Albans',
    gender: 'Male'
  },
  {
    id: 3,
    firstName: 'Susanne',
    lastName: 'Salling',
    city: 'Redhill',
    gender: 'Female'
  },
  {
    id: 4,
    firstName: 'Chris',
    lastName: 'Munt',
    city: 'Banstead',
    gender: 'Male'
  },
  {
    id: 5,
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'London',
    gender: 'Female'
  },
  {
    id: 6,
    firstName: 'Ian',
    lastName: 'Jones',
    city: 'Edinburgh',
    gender: 'Male'
  },
  {
    id: 7,
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


    $('#createTableBtn').on('click', function(e) {
      var msg = {
        type: 'createTable'
      };
      EWD.send(msg, (responseObj) => {
        $('#createTable-response').text(JSON.stringify(responseObj.message, null, 2));
        console.log(JSON.stringify(responseObj, null, 2));
        if (responseObj.message.error) {
          alert('Unable to create table');
        }
      });
    });

    $('#selectAllBtn').on('click', function(e) {
      var msg = {
        type: 'selectAll'
      };
      EWD.send(msg, (responseObj) => {
        $('#selectAll-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#addIndexBtn').on('click', function(e) {

      var name = $('#addIndex-name').val();

      if (name === "") {
        alert('You must enter an index name!');
        return;
      }

      var fields = $('#addIndex-fields').val();

      var msg = {
        type: 'addIndex',
        name: name,
        fields: fields
      };
      EWD.send(msg, (responseObj) => {
        $('#addIndex-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#insertBtn').on('click', function(e) {
      var msg = {
        type: 'insert',
        data: record
      };
      EWD.send(msg, (responseObj) => {
        $('#insert-response').text(JSON.stringify(responseObj.message, null, 2));
        if (!responseObj.error) {
          nextRecord();
        }
        else {
          alert('Unable to insert record');
        }
      });
    });

    $('#selectAllBtn').on('click', function(e) {
      var msg = {
        type: 'selectAll'
      };
      EWD.send(msg, (responseObj) => {
        $('#selectAll-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#selectCustomBtn').on('click', function(e) {

      var fields = $('#selectCustom-fields').val();

      if (fields === "") {
        alert('You must enter at least one field name!');
        return;
      }

      var where = $('#selectCustom-where').val();

      var msg = {
        type: 'selectCustom',
        fields: fields,
        where: where
      };
      EWD.send(msg, (responseObj) => {
        $('#selectCustom-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#deleteBtn').on('click', function(e) {

      var where = $('#delete-where').val();

      var msg = {
        type: 'delete',
        where: where
      };
      EWD.send(msg, (responseObj) => {
        $('#delete-response').text(JSON.stringify(responseObj.message, null, 2));
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
    application: 'jsdb-rdb',
    $: $,
    io: io
  });

});
