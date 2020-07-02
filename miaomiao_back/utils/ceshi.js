db.actorPic.aggregate([
    {
        $group:{_id:{pid:'$pid'},count:{$sum:1},dups:{$addToSet:'$_id'}}
    },
    {
        $match:{count:{$gt:1}}
    }
    ]).forEach(function(it){
        it.dups.shift();
        db.actorPic.remove({_id: {$in: it.dups}});
    });