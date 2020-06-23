const Piscina = require('piscina');
const path = require('path');

const piscina = new Piscina({
  filename: path.resolve(__dirname, 'pworker.js'),
  useAtomics: true,
  idleTimeout: 10000
});

console.log('master: ' + process.pid);

(async function() {
  const result = await piscina.runTask({ a: 4, b: 6 });
  console.log(result);  // Prints 10
})();
