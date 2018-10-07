module.exports = function(router, MongoClient, url, dbname, lodash, moment,
    ObjectID, authenticate) {
    router.get('/activity', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var callBack = function(ntId) {
                dbo.collection('activity').find({
                    createdBy: ntId
                }).toArray(
                    function(err, result) {
                        if (err) throw err;
                        res.json(result);
                        db.close();
                    });
            }
            authenticate(req, res, callBack);
        });
    });

    router.get('/allactivity', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection('activity').find({}).toArray(
                function(err, result) {
                    if (err) throw err;
                    res.json(result);
                    db.close();
                });
        });
    });

    router.post('/activity/:isClose', function(req, res) {
        let requestData = req.body;
        var isClose = req.params.isClose;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var callBack = function(ntId) {
                dbo.collection('activity', function(err,
                    collection) {
                    if (collection) {
                        if (requestData && requestData._id) {
                            collection.remove({"_id": ObjectID(requestData._id)});
                        }
                        var toUpdate = lodash.pick(requestData, ["date", "effort"]);
                        toUpdate.createdBy =  ntId.toUpperCase();
                        toUpdate.active = (isClose == 0) ? true : false;
                        collection.insert(toUpdate, { safe: true }, function(err, result) {
                                if (err) {
                                    res.send({'error': 'An error has occurred'});
                                } else {
                                    res.send(result.ops[0]);
                                }
                            });
                    }
                });
            }

            authenticate(req, res, callBack);
        });
    });

    router.get('/activity/:date', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var date = req.params.date;
            var callBack = function(ntId) {
                dbo.collection('activity').find({
                    createdBy: ntId
                }).toArray(
                    function(error, items) {
                        res.send(lodash.find(items, {
                            'date': moment(
                                parseInt(
                                    date
                                )).format(
                                'DD/MM/YYYY'
                            ),
                            'createdBy': ntId
                                .toUpperCase()
                        }));
                    });
            }
            authenticate(req, res, callBack);
        });
    });

    router.get('/activitylist/:date', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var date = req.params.date;
            var callBack = function(ntId) {
                dbo.collection('activity').find({}).toArray(
                    function(error, items) {
                        var dt = moment(parseInt(
                            date)).format(
                            'DD/MM/YYYY');
                        res.send(lodash.find(items, {
                            date: dt,
                            'createdBy': ntId
                                .toUpperCase()
                        }));
                    });
            }

            authenticate(req, res, callBack);
        });
    });


    router.get('/activityView', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var nt = [];
            var types = ['Project', 'Innovation',
                'Research', 'Competency_Building'
            ];
            dbo.collection('activity').find({}).toArray(
                function(err, result) {
                    var createdbyGroup = lodash.chain(
                            result)
                        .groupBy('createdBy')
                        .toPairs()
                        .map(function(item) {
                            return lodash.zipObject(
                                ["name", "data"],
                                item);
                        })
                        .value();
                    for (var ntGroup in createdbyGroup) {
                        var groupObject = {};
                        (createdbyGroup[ntGroup].data).forEach
                            (function(activity) {
                                var effortGroup =
                                    lodash.groupBy(
                                        activity.effort,
                                        'type');
                                types.forEach(
                                    function(
                                        type) {
                                        if (
                                            effortGroup[
                                                type
                                            ]) {
                                            (
                                                effortGroup[
                                                    type
                                                ]
                                            ).forEach
                                                (
                                                    function(
                                                        effortType
                                                    ) {
                                                        groupObject
                                                            [
                                                                type
                                                            ] =
                                                            (
                                                                groupObject[
                                                                    type
                                                                ] ?
                                                                groupObject[
                                                                    type
                                                                ] :
                                                                0
                                                            ) +
                                                            effortType
                                                            .hours;
                                                    }
                                                );
                                        }

                                    });

                            });
                        var data_obj = {
                            'name': createdbyGroup[
                                ntGroup].name
                        };
                        types.forEach(function(type) {
                            if (groupObject[
                                    type]) {
                                data_obj[type] =
                                    groupObject[
                                        type];
                            }
                        });
                        nt.push(data_obj);
                    }

                    if (err) throw err;
                    res.json(nt);
                    db.close();
                });
        });

    });

    router.get('/groupactivityView', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var nt = [];
            var types = ['Project', 'Innovation',
                'Research', 'Competency Building'
            ];
            dbo.collection('activity').find({}).toArray(
                function(err, result) {
                    var createdbyGroup = lodash.chain(
                            result)
                        .groupBy('createdBy')
                        .toPairs()
                        .map(function(item) {
                            return lodash.zipObject(
                                ["name", "data"],
                                item);
                        })
                        .value();
                    for (var ntGroup in createdbyGroup) {
                        var groupObject = {};
                        (createdbyGroup[ntGroup].data).forEach
                            (function(activity) {
                                var effortGroup =
                                    lodash.groupBy(
                                        activity.effort,
                                        'type');
                                types.forEach(
                                    function(
                                        type) {
                                        if (
                                            effortGroup[
                                                type
                                            ]) {
                                            (
                                                effortGroup[
                                                    type
                                                ]
                                            ).forEach
                                                (
                                                    function(
                                                        effortType
                                                    ) {
                                                        groupObject
                                                            [
                                                                type
                                                            ] =
                                                            (
                                                                groupObject[
                                                                    type
                                                                ] ?
                                                                groupObject[
                                                                    type
                                                                ] :
                                                                0
                                                            ) +
                                                            effortType
                                                            .hours;
                                                    }
                                                );
                                        }

                                    });

                            });
                        var data_obj = [];
                        types.forEach(function(type) {
                            if (groupObject[
                                    type]) {

                                data_obj.push({
                                    'type': type,
                                    'hours': groupObject[
                                        type
                                    ]
                                });
                                data_obj[type] =
                                    groupObject[
                                        type];
                            } else {
                                data_obj.push({
                                    'type': type,
                                    'hours': ''
                                });

                            }
                        });
                        var push_obj = {
                            'name': createdbyGroup[
                                ntGroup].name,
                            'series': data_obj
                        };
                        nt.push(push_obj);
                    }

                    if (err) throw err;
                    res.json(nt);

                    db.close();
                });
        });

    });
}