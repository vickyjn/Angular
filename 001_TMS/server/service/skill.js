module.exports = function(router, MongoClient, url, dbname, lodash, ObjectID, authenticate) {
    router.get('/skills', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var callBack = function(ntId) {
                dbo.collection('skills').find({}).toArray(
                    function(err, result) {
                        if (err) throw err;
                        result = lodash.orderBy(result, ['skill'], ['asc']);
                        res.json(result);
                        db.close();
                    });
            }
            authenticate(req, res, callBack);
        });
    });
    router.post('/updateCompetency', function(req, res){
        var skill = req.body;
        var skillName = skill.skill;
        var skillLevels = skill.levels;
        var skillLevel1 = skillLevels.level1;
        var skillLevel2 = skillLevels.level2;
        var skillLevel3 = skillLevels.level3;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var serviceSkill, dbo = db.db(dbname);
            var callBack = function(ntId) {
                var selectedSkill;
                dbo.collection('skills', function(err, result) {
                    result.find({"_id": ObjectID(skill._id)}).toArray(function(err, skillReceived) {                        
                        selectedSkill = skillReceived[0];
                        if (skill && skill._id) {
                            result.remove({"_id": ObjectID(skill._id)});
                        }
                        var levels = selectedSkill.levels, updatedLevels = {};
                        if(levels) {
                            updatedLevels.level1 = lodash.uniq(skillLevel1.concat(levels.level1));
                            updatedLevels.level2 = lodash.uniq(skillLevel2.concat(levels.level2));
                            updatedLevels.level3 = lodash.uniq(skillLevel3.concat(levels.level3));
                        } else {
                            updatedLevels.level1 = lodash.uniq(skillLevel1);
                            updatedLevels.level2 = lodash.uniq(skillLevel2);
                            updatedLevels.level3 = lodash.uniq(skillLevel3);
                        }
                        selectedSkill.levels = updatedLevels;
                        result.insert(selectedSkill, { safe: true }, function(err, result) {
                            if (err) {
                                res.send({'error': 'An error has occurred'});
                            } else {
                                res.send(result.ops[0]);
                            }
                            db.close();
                        });
                    });
                });
            }
            authenticate(req, res, callBack);
        });
    });
};