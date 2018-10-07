var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var nodeSSPI = require('node-sspi');
var ObjectID = require('mongodb').ObjectID;
var lodash = require('lodash');
var fallback = require('express-history-api-fallback');
var nodeSSPIObj = new nodeSSPI({
    retrieveGroups: true
});
var prod = false;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8081; // set our port
var dbname = prod ? 'tms' : 'tms-dev';

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();
var api = [{
    'service': '/getmenu',
    'desc': 'Get all the header menu.',
    'type': 'GET'
}, {
    'service': '/download',
    'desc': 'Download all records from database.'
}, {
    'service': '/getemployee',
    'desc': 'Get all employee records from database.'
}, {
    'service': '/getemployee/:id',
    'desc': 'Get individual employee record from database.'
}, {
    'service': '/editprofile',
    'desc': 'Get individual employee record from database.',
    'type': 'PUT'
}]
router.get('/test', function(req, res) {
    res.json({
        message: 'welcome || API Interface!. if you are able to see this message --Yes-- Service is working --No-- Check API Configuration.',
        apis: api
    });
});
router.get('/getntid', function(req, res) {
    var callBack = function(ntId) {
        res.json({
            "ntid": ntId
        });
    }
    authenticate(req, res, callBack);
});

function authenticate(req, res, doSuccess) {
    if (prod) {
        nodeSSPIObj.authenticate(req, res, function(err) {
            if (res && res.connection && res.connection.user) {
                var ntId = (res.connection.user).substring(5);
                doSuccess(ntId);
            }
        });
    } else {
        doSuccess('SBA5COB');
    }
}
require('./service/menu.js')(router, MongoClient, url, dbname, lodash,
    authenticate);
require('./service/employee.js')(router, MongoClient, url, dbname, lodash,
    ObjectID, authenticate);
require('./service/activity.js')(router, MongoClient, url, dbname, lodash,
    moment, ObjectID, authenticate);
require('./service/skill.js')(router, MongoClient, url, dbname, lodash, ObjectID,
    authenticate);
app.use('/api', router);
/*Express fallback to handle client refresh*/
var root = __dirname + '/dist';
app.use(express.static(root))
app.use(fallback('index.html', {
    root: root
}));
console.log('Server Running on --> ' + port);
app.listen(port);