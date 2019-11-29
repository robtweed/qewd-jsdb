var test_data = {
  "resourceType": "Patient",
  "text": {
    "status": "generated"
  },
  "identifier": [
    {
      "use": "usual",
      "label": "MRN",
      "system": "urn:oid:1.2.36.146.595.217.0.1",
      "value": "12345",
      "period": {
        "start": "2001-05-06"
      },
      "assigner": {
        "display": "Acme Healthcare"
      }
    }
  ],
  "name": [
    {
      "use": "official",
      "family": [
        "Chalmers"
      ],
      "given": [
        "Peter",
        "James"
      ]
    },
    {
      "use": "usual",
      "given": [
        "Jim"
      ]
    }
  ],
  "telecom": [
    {
      "use": "home"
    },
    {
      "system": "phone",
      "value": "(03) 5555 6473",
      "use": "work"
    }
  ],
  "gender": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/v3/AdministrativeGender",
        "code": "M",
        "display": "Male"
      }
    ]
  },
  "birthDate": "1974-12-25",
  "deceasedBoolean": false,
  "address": [
    {
      "use": "home",
      "line": [
        "534 Erewhon St"
      ],
      "city": "PleasantVille",
      "state": "Vic",
      "zip": "3999"
    }
  ],
  "contact": [
    {
      "relationship": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/patient-contact-relationship",
              "code": "partner"
            }
          ]
        }
      ],
      "name": {
        "family": [
          "du",
          "March"
        ],
        "_family": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/Profile/iso-21090#qualifier",
                "valueCode": "VV"
              }
            ]
          },
          null
        ],
        "given": [
          "Benadicte"
        ]
      },
      "telecom": [
        {
          "system": "phone",
          "value": "+33 (237) 998327"
        }
      ]
    }
  ],
  "managingOrganization": {
    "reference": "Organization/1"
  },
  "active": true
};


$(document).ready(function() {

  var textarea = document.getElementById("insertSubTree-json");
  var heightLimit = 200; /* Maximum height: 200px */

  textarea.oninput = function() {
    textarea.style.height = ""; /* Reset the height*/
    textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
  };

  $('#record').text(JSON.stringify(test_data, null, 2));
  $('#hideJSONBtn').show();
  $('#showJSONBtn').hide();
  $('#drillDownReset').hide();
  $('#method-property').text('getDocument(true)');

  EWD.on('ewd-registered', function() {

    $('#hideJSONBtn').on('click', function(e) {
      $('#record').hide();
      $('#hideJSONBtn').hide();
      $('#showJSONBtn').show();
    });

    $('#showJSONBtn').on('click', function(e) {
      $('#record').show();
      $('#hideJSONBtn').show();
      $('#showJSONBtn').hide();
    });

    $('#clearBtn').on('click', function(e) {
      var msg = {
        type: 'clear_down'
      };
      EWD.send(msg, (responseObj) => {
        $('#deleteSubTree-response').text('');
        $('#setDocument-response').text('');
        $('#getDocument-response').text('');
        $('#drillDown-response').text('');
      });
    });


    $('#setDocumentBtn').on('click', function(e) {
      var msg = {
        type: 'setDocument',
        data: test_data
      };
      EWD.send(msg, (responseObj) => {
        $('#setDocument-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#getDocumentBtn').on('click', function(e) {
      var msg = {
        type: 'getDocument',
      };
      EWD.send(msg, (responseObj) => {
        $('#getDocument-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    var drillDown_subscripts = ['contact', 0, 'name', 'family', 1];
    var subscripts = ['demo'];
    var level = -1;
    var subscript_list = "$('demo').";
    $('#subscript_list').text(subscript_list);
    

    $('#drillDownBtn').on('click', function(e) {
      level++;
      if (level < 5) {
        subscripts.push(drillDown_subscripts[level]);
         subscript_list = subscript_list + "$('" + drillDown_subscripts[level] + "').";
        $('#subscript_list').text(subscript_list);
      }
      if (level === 4) {
        $('#method-property').text('value');
        $('#drillDownReset').show();
        $('#drillDownBtn').hide();
      }
      var msg = {
        type: 'drillDown',
        subscripts: subscripts
      };
      EWD.send(msg, (responseObj) => {
        $('#drillDown-exists').text(responseObj.message.exists);
        $('#drillDown-hasValue').text(responseObj.message.hasValue);
        $('#drillDown-hasChildren').text(responseObj.message.hasChildren);
        if (responseObj.message.hasValue) {
          $('#drillDown-response').text(responseObj.message.json.value);
        }
        else {
          $('#drillDown-response').text(JSON.stringify(responseObj.message.json, null, 2));
        }
      });
    });

    $('#drillDownResetBtn').on('click', function(e) {
      subscripts = ['demo'];
      level = -1;
      subscript_list = "$('demo').";
      $('#subscript_list').text(subscript_list);
      $('#drillDownReset').hide();
      $('#drillDownBtn').show();
      $('#method-property').text('getDocument(true)');
    });


    $('#newValueBtn').on('click', function(e) {
      var value = $('#newValue').val();
      if (value === '') {
        alert('You must enter a value!');
        return;
      }
      var msg = {
        type: 'newValue',
        subscripts: subscripts,
        value: value
      };
      EWD.send(msg, (responseObj) => {
        $('#drillDown-response').text(responseObj.message.value);
      });

    });

    $('#deleteSubTreeBtn').on('click', function(e) {
      var subs = $('#deleteSubTree-path').val();
      var pieces = subs.split('.');
      var path = [];
      pieces.forEach(function(piece) {
        path.push(piece.trim());
      });
      var msg = {
        type: 'deleteSubTree',
        subscripts: path
      };
      EWD.send(msg, (responseObj) => {
        $('#deleteSubTree-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#insertSubTreeBtn').on('click', function(e) {
      var text = $('#insertSubTree-json').val();
      var json;
      try {
        json = JSON.parse(text);
      }
      catch(err) {
        alert('Invalid JSON!');
        return;
      }
      var subs = $('#insertSubTree-path').val();
      var pieces = subs.split('.');
      var path = [];
      pieces.forEach(function(piece) {
        path.push(piece.trim());
      });
      var msg = {
        type: 'insertSubTree',
        subscripts: path,
        json: json
      };
      EWD.send(msg, (responseObj) => {
        $('#insertSubTree-response').text(JSON.stringify(responseObj.message, null, 2));
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
    application: 'jsdb-document',
    $: $,
    io: io
  });

});
