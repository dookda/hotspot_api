var https = require('https');
var fs = require('fs');
const express = require('express');
const app = express();

var https_options = {
    key: fs.readFileSync("/etc/apache2/ssl/private.key"),
    cert: fs.readFileSync("/etc/apache2/ssl/public.crt"),
    ca: fs.readFileSync('/etc/apache2/ssl/intermediate.crt')
};

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use('/', express.static('www'))

const hp = require('./service/hotspot');
app.use(hp);

const safe = require('./service/safe');
app.use(safe);

var server = https.createServer(https_options, app);
var port = process.env.PORT || 3600;
server.listen(port, function () {
    console.log('Hello IREALLYHOST listening on port ' + server.address().port);
});