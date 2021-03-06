/**
 * Copyright 2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
const express = require('express');
const nconf = require('nconf');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const ParseDashboard = require('parse-dashboard');

nconf.argv().env().file({ file: 'config.json' });

// Code to be run locally to connect Dashboard
/*
var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": 'https://20161126t231304-dot-eleos-150719.appspot-preview.com/parse',
      "appId": nconf.get('APP_ID'),
      "masterKey": nconf.get('MASTER_KEY'),
      "appName": "Eleos Remote Help"
    }
],
"users": [
    {
        "user":"admin",
        "pass":"admin"
    }
]
}, true);
*/

const app = express();

const parseServer = new ParseServer({
  databaseURI: nconf.get('DATABASE_URI') || 'mongodb://localhost:27017/dev',
  cloud: nconf.get('CLOUD_PATH') || path.join(__dirname, '/cloud/main.js'),
  appId: nconf.get('APP_ID'),
  masterKey: nconf.get('MASTER_KEY'),
  fileKey: nconf.get('FILE_KEY'),
  serverURL: nconf.get('SERVER_URL')
});

app.use(process.env.PARSE_MOUNT_PATH || '/parse', parseServer);

//app.use('/dashboard', dashboard);

app.get('/', (req, res) => {
  res.status(200).send('<p><h1>Project Eleos</h1></p>Parse is up and running ...');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
