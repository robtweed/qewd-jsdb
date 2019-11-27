/*

 ----------------------------------------------------------------------------
 | QEWD-JSdb: Quick Installer                                               |
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

  var ask = this.ask;
  var fs = this.fs;
  var isNumeric = this.isNumeric;
  var npm_install = this.install_module;
  var path = require('path');
  var transform = this.transform;

  var createJSONFile = fs.createJSONFile;
  var createFile = fs.createFile;

  var customScript;
  try {
    customScript = require('/node/custom-install');
    console.log('Custom script loaded');
  }
  catch(err) {
    console.log('No custom script or unable to load it');
  }

  // -----------------------------------------------

  var helpers = {
    createUuid: function() {
      return uuid();
    },
    createHost: function(protocol, host) {
      if (!host || host === '') {
        return '<!delete>';
      }
      protocol = protocol || 'http';
      return protocol + '://' + host;
    },
    createUri: function(protocol, host, port, path) {
      var uri = protocol + '://' + host;
      if (port === 80 || port === 443) {
        port = '';
      }
      if (port && port !== '') {
        uri = uri + ':' + port;
      }
      if (path) {
        uri = uri + path;
      }
      return uri;
    },
    getExpiry: function(expiry) {
      return expiry/1000;
    }
  };

  function createConfig(serviceName, settings) {
    var config_template_path = '/node/' + serviceName + '/configuration/config_template.json';
    var config_path = '/node/' + serviceName + '/configuration/config.json';

    try {
      var config_template = require(config_template_path);
    }
    catch(err) {
      console.log('Error! Unable to load ' + config_template_path);
      console.log('**** Unable to continue, so Installation has been cancelled ****');
      return false;
    }

    var config = transform(config_template, settings, helpers);
    createJSONFile(config, config_path);
    return true;
  }

  var start_container = [
    "#!/bin/bash",
    "# This script will correctly start the QEWD-JSdb Container",
    "#", 
    "#",
    "#  Run this startup script from the QEWD-JSDb folder using:",
    "#",
    "#     - with persistence:    ./start_p",
    "#     - without persistence: ./start",
    "#",
    "echo 'Starting jsdb container'",
    "docker run -d --name jsdb --rm --network qewd-jsdb -p {{port}}:8080 -v {{volume_path}}:/opt/qewd/mapped {{ydb_persistence}} {{container}}",
    "echo 'jsdb Container has been started'"
  ];

  var stop_container = [
    "#!/bin/bash",
    "# This script will cleanly stop the jsdb Container by issuing a command to QEWD to stop",
    "#",
    "#",
    "#  Run this script from the QEWD-jsdb folder using:",
    "#",
    "#     ./stop",
    "#",
    "echo 'Stopping jsdb Container'",
    "#",
    "#  Send authenticated requests to cleanly shut down QEWD Containers",
    "#",
    "docker run -it --name jsdb_shutdown --rm --network qewd-jsdb -v $PWD:/node -e \"node_script=shutdown\" rtweed/node-runner"
  ];

  // -------------------------------------------------


  console.log(' ');
  console.log('*************** QEWD-JSdb Installer ***************');
  //console.log(' ');
  //console.log('  Please wait while I install some packages into the node-runner container...');
  //console.log(' ');

  //this.shell('apt-get update');
  //this.shell('apt-get install -y subversion');

  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log('*************** QEWD-JSdb Installer ***************');
  console.log(' ');
  console.log('  Running this script will install all the components');
  console.log('  needed by QEWD-JSdb, and correctly configure it for');
  console.log('  your platform');

  var ok = ask.keyInYNStrict('Is this what you want to do?');

  if (!ok) {
    console.log('**** Installation has been cancelled ****');
    return;
  }

  console.log('*** Installation will now commence');

  // JSdb Container

  var config_path = '/node/configuration/config.json';
  var config;

  try {
    config = require(config_path);
    // ensure minimum working configuration
    if (!config.qewd_up) {
      config.qewd_up = true;
    }
    if (!config.qewd) {
      config.qewd = {
        bodyParser: 'body-parser'
      };
    }
    if (!config.qewd.bodyParser) {
      config.qewd.bodyParser = 'body-parser';
    }
  }
  catch(err) {
    console.log('Error! Unable to load ' + config_path);
    console.log('Using default settings instead...');
    config = {
      qewd_up: true,
      qewd: {
        bodyParser: 'body-parser'
      }
    };
  }

  var settings = {
    port: config.port || 8080
  };

  // JSdb Listener Port

  ok = false;
  port = settings.port;
  do {
    console.log(' ');
    console.log('Specify the port on which the QEWD-JSdb Web Server will listen.');
    console.log(' ');
    port = ask.question('QEWD-JSdb port (' + port + '): ', {defaultInput: port});
    if (port !== '' && isNumeric(port)) {
      ok = true;
    }
    else {
      console.log('*** Error: you must enter a valid port number');
      port = settings.port;
    }
  } while (!ok);

  console.log(' ');
  console.log('QEWD-JSdb Port will be ' + port);

  settings.port = port;
  config.qewd.port = port;

  // QEWD Worker Process Pool

  ok = false;
  var poolSize = config.qewd.poolSize || 2;
  do {
    console.log(' ');
    console.log('Set the maximum number of QEWD Worker Processes that will be started.');
    console.log(' ');
    poolSize = ask.question('QEWD Worker Pool Size (' + poolSize + '): ', {defaultInput: poolSize});
    if (poolSize !== '' && isNumeric(poolSize)) {
      ok = true;
    }
    else {
      console.log('*** Error: you must enter a valid pool size number');
      poolSize = config.qewd.poolSize || 2;
    }
  } while (!ok);

  console.log(' ');
  console.log('QEWD Worker Pool Size set to ' + poolSize);

  config.qewd.poolSize = poolSize;

  // Management Password

  ok = false;
  var password = config.qewd.managementPassword || 'keepThisSecret!';
  do {
    console.log(' ');
    console.log('If you use the QEWD Monitor application, it will ask for a password.');
    console.log('You can change that password now'); 
    console.log(' ');
    password = ask.question('QEWD Monitor Password (' + password + '): ', {defaultInput: password});
    if (password === '') {
      password = config.qewd.managementPassword || 'keepThisSecret!';
      console.log('*** Error: you must specify a password');
    }
    else {
      config.qewd.managementPassword = password;
      ok = true;
    }
  } while (!ok);

  console.log(' ');
  console.log('QEWD Monitor password will be ' + password);

  createJSONFile(config, config_path);


  // Loading Modules from NPM

  var install_modules_path = '/node/install_modules.json';
  if (fs.existsSync(install_modules_path)) {

    console.log(' ');
    console.log('Now installing module dependencies from NPM');

    console.log(' ');
    console.log('This is usually a one-time load of the Node.js Modules');
    console.log('that are required by your QEWD-JSdb system.');
    console.log('However, you may want to force a clean reload of them now');
    console.log(' ');
    console.log('Note: if this is the first time you are running this installer,');
    console.log('it does not matter what you answer - all modules will be loaded');
    console.log(' ');
    var cleardown = ask.keyInYNStrict('Do you want to clear down all pre-loaded modules?');

    var module_path;
    if (cleardown) {
      module_path = '/node/node_modules';
      fs.removeSync(module_path);
    }
 
    var modules;
    try {
      modules = require(install_modules_path);
      modules.forEach(function(module) {
        npm_install(module);
      });
    }
    catch(err) {
      console.log('Error! Unable to load ' + modules_path);
      console.log(err);
      return;
    }
  }


  // QEWD-JSdb Folder for volume mapping

  console.log(' ');
  console.log('The QEWD-JSdb Container must map the QEWD-JSdb folder,');
  console.log('so you need to confirm what the correct folder is.');
  console.log('This installer can then automatically create the correct')
  console.log('"docker run" commands for you in the startup file');
  console.log(' ');

  var volume_path = process.env.HOST_VOLUME || settings.volume_path;
  ok = false;
  do {
    console.log(' ');
    volume_path = ask.question('QEWD-JSdb folder (' + volume_path + '): ', {defaultInput: volume_path});
    if (volume_path !== '') {
      ok = true;
    }
    else {
      console.log('*** Error: you must enter a valid volume path');
      volume_path = settings.volume_path;
    }
  } while (!ok);

  console.log(' ');
  console.log('The path that will be volume mapped is ' + volume_path);
  settings.volume_path = volume_path;


  // Persistent data storage

  // Add the pre-initialised files to the mapped volume 
  //  but only if they aren't there already.
  // If they already exist, they may have data in them!

  var yottadb_path = '/node/yottadb';
  var os = 'linux';
  if (process.env.PLATFORM === 'arm') {
    os = 'rpi';
  }

  if (!fs.existsSync(yottadb_path)) {
    this.shell('svn export https://github.com/robtweed/yotta-gbldir-files/trunk/r1.28/' + os + '  ' + yottadb_path);
  }

  // Create startup files for persistence and non-persistence

  console.log(' ');
  console.log('Now creating the startup files for you to use to start the');
  console.log('QDWD-JSdb Container on your server, using your configuration settings.');

  var suffix = '';
  if (process.env.PLATFORM === 'arm') {
    suffix = '-rpi';
  }
  settings.container = 'rtweed/qewd-server' + suffix;

  var volume_map = '-v ' + volume_path + '/yottadb:/root/.yottadb/r1.28_';
  if (os === 'linux') {
    volume_map = volume_map + 'x86_64/g';
  }
  else {
    volume_map = volume_map + 'armv7l/g';
  }
  settings.ydb_persistence = volume_map;

  var content = transform(start_container, settings, helpers);
  var filePath = '/node/start_p';
  createFile(content, filePath);
  this.shell('chmod +x ' + filePath);

  settings.ydb_persistence = '';
  content = transform(start_container, settings, helpers);
  filePath = '/node/start';
  createFile(content, filePath);
  this.shell('chmod +x ' + filePath);

  filePath = '/node/stop';
  stop_container.forEach(function(line, index) {
    if (line.includes('node-runner')) {
      stop_container[index] = line + suffix;
    }
  });
  createFile(stop_container, filePath);
  this.shell('chmod +x ' + filePath);


  // If a custom installation file has been added, run it now

  var ctx = this;
  ctx.settings = settings;
  if (customScript) {
    console.log('Now running your custom install script...');

    customScript.call(ctx);

    console.log(' ');
    console.log('Custom script completed');
    console.log(' ');
  }

  console.log(' ');
  console.log('*** Installation and Configuration was successful');
  console.log(' ');
  console.log('You can now start up the QEWD-JSdb Container by running the commands:');
  console.log('- with data persistence to host files; ./start_p');
  console.log('- without persistence; ./start');
  console.log(' ');
  console.log('You can shut it down using the command:');
  console.log('./stop');

  return;

};


