module.exports = function(router, MongoClient, url, dbname, lodash, ObjectID, authenticate) {
    router.get('/getemployee', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection('employeeList').find({}).toArray(
                function(err, result) {
                    if (err) throw err;
                    res.send(result);
                    db.close();
                });
        });
    });

    router.get('/getemployee/:id', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var id = req.params.id;
            dbo.collection('employeeList').findOne({
                id: id
            }, function(err, result) {
                if (err) throw err;
                res.send(result);
                db.close();
            });
        });
    });

    router.put('/editprofile', function(req, res) {
        let requestData = req.body;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var callBack = function(ntId) {

                    dbo.collection('employeeList', function(err,
                        collection) {
                        if (requestData && requestData._id) {
                            collection.remove({
                                "_id": ObjectID(
                                    requestData
                                    ._id)
                            });
                        }
                        var toUpdate = lodash.pick(
                            requestData, ["firstName",
                                "lastName", "password",
                                "skills", "designation",
                                "picture",
                                "allocationStatus",
                                "billable",
                                "description",
                                "experience",
                                "tools"
                            ]);
                        toUpdate.id = ntId.toLowerCase();
                        collection.insert(toUpdate, {
                            safe: true
                        }, function(err, result) {
                            if (err) {
                                res.send({
                                    'error': 'An error has occurred'
                                });
                            } else {
                                res.send(result.ops[
                                    0]);
                            }
                        });
                    });
                }
                authenticate(req, res, callBack);
        });
    });



    router.get('/contributors/:query', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var query = req.params.query;
            var search = new RegExp(query, 'i');
            dbo.collection('employeeList').find({
                $or: [{
                    firstName: search
                }, {
                    lastName: search
                }, {
                    id: search
                }]
            }).toArray(function(err, result) {
                if (err) throw err;
                res.send(result);
                db.close();
            });
        });
    });
}