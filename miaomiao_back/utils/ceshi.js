const { db } = require("../Dao/user");

db.actor.aggregate([
    {
        $group:{_id:{pid:'$pid'},count:{$sum:1},dups:{$addToSet:'$_id'}}
    },
    {
        $match:{count:{$gt:1}}
    }
    ]).forEach(function(it){
        it.dups.shift();
        db.actor.remove({_id: {$in: it.dups}});
    });
db.actor.aggregate([
    {
        $group:{_id:{name:'$pid'},count:{$sum:1}}
    },
    {
        $match:{count:{$gt:1}}
    }
])