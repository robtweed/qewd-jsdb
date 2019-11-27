/*

 ----------------------------------------------------------------------------
 | QEWD-JSdb: Clean Container Shutdown                                      |
 |                                                                          |
 | Copyright (c) 2019 M/Gateway Developments Ltd,                           |
 | Redhill, Surrey UK.                                                      |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                               |
 |                                                                          |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

  23 November 2019

*/

module.exports = function() {

  var fs = this.fs;
  var requestSync = this.requestSync;

  var config;
  var config_path = '/node/configuration/config.json';
  if (!fs.existsSync(config_path)) {
    console.log('Error: unable to find ' +  config_path);
    console.log('*** Unable to continue shutting down the QEWD-JSdb Container');
    return;
  }
  try {
    config = require(config_path);
  }
  catch(err) {
    console.log('Error: unable to load ' +  config_path);
    console.log(err);
    console.log('*** Unable to continue shutting down the QEWD-JSdb Container');
    return;
  }

  var password = config.qewd.managementPassword;
  var secret = config.jwt.secret;
  var auth = 'Basic ' + Buffer.from(password + ':' + secret).toString('base64');

  var options = {
    url: 'http://jsdb:' + config.qewd.port + '/jsdb/shutdown',
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-type': 'application/json'
    }
  };
  var result = this.requestSync.send(options);

  console.log(result);
  console.log('QEWD-JSdb Container has been signalled to stop');

};
