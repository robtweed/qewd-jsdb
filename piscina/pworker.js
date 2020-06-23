let jsdb = require('./jsdb_piscina');

module.exports = ({ a, b }) => {

  // list the persistent Document directory in the JSdb database

  console.log(jsdb.db.global_directory());

  // We'll explore the Person document

  let person = jsdb.use('Person');

  // populate it if no data yet

  if (!person.exists) {

    let data = {
      by_id: {
        1: {
          city: 'Redhill',
          gender: 'm',
          name: 'Rob'
        },
        2: {
          city: 'St Albans',
          gender: 'm',
          name: 'Simon'
        },
        3: {
          city: 'Carshalton',
          gender: 'f',
          name: 'Helen'
        }
      },
      id_counter: 3
    };

    person.setDocument(data);
  }

  person.forEachLeafNode(function(value, node) {
     console.log(node.path + ': ' + value);
  });


  person.forEachChild(function(ix, node) {
    console.log('ix = ' + ix);
    node.forEachChild(function(ix2, node2) {
      console.log('  ix2: ' + ix2);
      node2.forEachChild(function(ix3, node3) {
        console.log('    ix3: ' + ix3 + ': ' + node3.value);
      });
    });
  });

  return a + b;
};
