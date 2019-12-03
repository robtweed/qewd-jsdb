var test_xml = '<doc>\n\
  <foo id="foo1" location="Drumcondra">\n\
    <bar id="cat-and-cage" name="Cat and Cage">pub 1</bar>\n\
    <bar id="fagans" name="Fagan\'s" owner="John" tied="true">pub 2</bar>\n\
    <offlicense id="oddbins" name="oddbins"/>\n\
    <bar id="gravediggers" name="Gravedigger\'s">pub 3</bar>\n\
    <bar id="ivy" name="Ivy House">pub 4</bar>\n\
  </foo>\n\
  <foo id="foo2" location="Town">\n\
    <bar id="peters" name="Peter\'s Pub">pub 5</bar>\n\
    <bar id="grogans" name="Grogan\'s">pub 6</bar>\n\
    <bar id="hogans" name="Hogans\'s">club 1</bar>\n\
    <bar id="brogans" name="Brogan\'s" tied="false" owner="James">pub 8</bar>\n\
    <bar id="pub9" closed="yes">pub 9</bar>\n\
    <offlicense id="unwins" name="unwins"/>\n\
  </foo>\n\
  <aaa id="aaa">\n\
    <bbb id="bbb">\n\
      <bar id="robin-hood" name="Robin Hood">pub 10\n\
        <beer name="guinness"/>\n\
        <beer name="tetleys"/>\n\
      </bar>\n\
      <bar id="no-name">As yet un-named pub</bar>\n\
    </bbb>\n\
    <foo>\n\
      <ccc/>\n\
    </foo>\n\
  </aaa>\n\
</doc>\
';

var test_json = {
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
          "Benedicte"
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

  $('#record').text(test_xml);
  $('#outputAsJSONBtn').hide();

  EWD.on('ewd-registered', function() {

    var sourceType = 'xml';

    $('#clearBtn').on('click', function(e) {
      var msg = {
        type: 'clear_down'
      };
      EWD.send(msg, (responseObj) => {
        $('#parse-response').text('');
        $('#output-response').text('');
        $('#byTagName-response').text('');
        $('#byId-response').text('');
        $('#removeElement-response').text('');
      });
    });

    $('#sourceBtn').on('click', function(e) {
      if (sourceType === 'xml') {
        sourceType = 'json';
        $('#source-title').text('Test JSON Document');
        $('#record').text(JSON.stringify(test_json, null, 2));
        $('#parseBtn').text('Parse as JSON');
        $('#parseExample').text("doc = this.documentStore.use('jsdbDom', 'demo')\ndoc.enable_dom()\nok = doc.dom.parser.parseAsJSON(json)");
      }
      else {
        sourceType = 'xml';
        $('#source-title').text('Test XML Document');
        $('#record').text(test_xml);
        $('#parseBtn').text('Parse as XML');
        $('#parseExample').text("doc = this.documentStore.use('jsdbDom', 'demo')\ndoc.enable_dom()\nok = doc.dom.parser.parseText(xml)");
      }
    });


    $('#parseBtn').on('click', function(e) {
      if (sourceType === 'xml') {
        var msg = {
          type: 'parse',
          xml: test_xml
        };
      }
      else {
        var msg = {
          type: 'parseAsJSON',
          json: test_json
        };
      }
      EWD.send(msg, (responseObj) => {
        $('#parse-response').text(JSON.stringify(responseObj.message, null, 2));
        if (!responseObj.message.error) {
          if (sourceType === 'xml') {
            $('#outputAsJSONBtn').hide();
          }
          else {
            $('#outputAsJSONBtn').show();
          }
        }
      });
    });


    $('#outputBtn').on('click', function(e) {
      var indent = $('#output-indent').val();
      var msg = {
        type: 'output',
        indent: indent
      };
      EWD.send(msg, (responseObj) => {
        $('#output-response').text(responseObj.message.xml);
      });
    });

    $('#outputAsJSONBtn').on('click', function(e) {
      var indent = $('#output-indent').val();
      var msg = {
        type: 'outputAsJSON'
      };
      EWD.send(msg, (responseObj) => {
        $('#output-response').text(JSON.stringify(responseObj.message.json, null, +indent));
      });
    });

    $('#byTagNameBtn').on('click', function(e) {
      var tagName = $('#byTagName-tagName').val();

      if (tagName === '') {
        alert('You must enter a tagName');
        return;
      }

      var msg = {
        type: 'getElementsByTagName',
        tagName: tagName
      };
      EWD.send(msg, (responseObj) => {
        $('#byTagName-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#byIdBtn').on('click', function(e) {
      var id = $('#byId-id').val();

      if (id === '') {
        alert('You must enter an id');
        return;
      }

      var msg = {
        type: 'getElementById',
        id: id
      };
      EWD.send(msg, (responseObj) => {
        $('#byId-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#xpathBtn').on('click', function(e) {
      var xpath = $('#xpath-text').val();

      if (xpath === '') {
        alert('You must enter an xpath query');
        return;
      }

      var msg = {
        type: 'xpath',
        xpath: xpath
      };
      EWD.send(msg, (responseObj) => {
        $('#xpath-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#removeElementBtn').on('click', function(e) {
      var id = $('#removeElement-id').val();

      if (id === '') {
        alert('You must enter an id');
        return;
      }

      var msg = {
        type: 'removeElementAsParent',
        id: id
      };
      EWD.send(msg, (responseObj) => {
        $('#removeElement-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });

    $('#removeSubTreeBtn').on('click', function(e) {
      var id = $('#removeSubTree-id').val();

      if (id === '') {
        alert('You must enter an id');
        return;
      }

      var msg = {
        type: 'removeChild',
        id: id
      };
      EWD.send(msg, (responseObj) => {
        $('#removeSubTree-response').text(JSON.stringify(responseObj.message, null, 2));
      });
    });


    $('#appendElementBtn').on('click', function(e) {
      var id = $('#appendElement-id').val();

      if (id === '') {
        alert('You must enter an id');
        return;
      }

      var tag = $('#appendElement-tag').val();

      if (tag === '') {
        alert('You must enter a tag, eg <foo id="abc">text</foo>');
        return;
      }
      if (tag[0] !== '<' && tag[tag.length - 1] !== '>') {
        alert('Invalid xml format.  Should be like this: <foo id="abc">text</foo>');
      }

      var parser = new DOMParser();
      var doc = parser.parseFromString(tag, 'text/xml');
      var errorTag = doc.getElementsByTagName('parsererror')[0];
      if (typeof errorTag !== 'undefined') {
        alert('Invalid xml format.  Should be like this: <foo id="abc">text</foo>');
      }

      var node = doc.documentElement;
      var attrs = node.attributes;
      var attributes = {};
      var attr;
      for (var i =0; i < attrs.length; i++) {
        attr = attrs[i];
        attributes[attr.name] = attr.value;
      }
      
      var msg = {
        type: 'appendElement',
        id: id,
        tagName: node.tagName,
        text: node.textContent,
        attributes: attributes
      };
      EWD.send(msg, (responseObj) => {
        $('#appendElement-response').text(JSON.stringify(responseObj.message, null, 2));
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
    application: 'jsdb-dom',
    $: $,
    io: io
  });

});
