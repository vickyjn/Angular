var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var express = require('express');
var app = express();

var dbname = 'Documents';
// ROUTES FOR OUR API
// =============================================================================

app.route('/ceat').get(function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbname);
        dbo.collection('ceat').find({}).toArray(
            function(err, result) {
                if (err) throw err;
                res.send(result);
                db.close();
            });
    });
});

// router.get('/getData/:date', function(req, res) {
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db(dbname);
//         var date = req.params.date;
//             dbo.collection('ceat').find({}).toArray(
//                 function(error, items) {
//                     var dt = moment(parseInt(date)).format(
//                         'DD/MM/YYYY');
//                     console.log(dt);
//                     res.send(lodash.find(items, {
//                         date: dt
//                     }));
//                 });
//     });
// });

/*Express fallback to handle client refresh*/

var server = app.listen(3000, function() {
    console.log("server running in 3000")
}); 