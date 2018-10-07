module.exports = function (router, MongoClient, url, dbname, lodash) {
    router.get('/getmenu', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection('menu').find({}).toArray(function(err, result) {
                if (err) throw err;
                res.send(lodash.filter(result, {enabled: true}));
                db.close();
            });
        });
    });
}