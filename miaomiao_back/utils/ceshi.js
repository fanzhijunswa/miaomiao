db.Passages.aggregate([
    {
        //以集合中的content和endTime和startTime这三个字段进行分组，这三个字段必须完全相同的就会在一组，只要有一个字段不一致的，就不会在一组
        //通过count:{$sum:1}来计算出每个分组的数量
        //dups:{} 将每个文档的_id唯一索引放入到每组的dups数组中，存放起来，假设当前组有四个文档，那么当前组的dups就有四个_id
        //通过$match来进行过滤，筛选出count大于1的分组，代表筛选掉只出现一次的分组
        $group:{_id:{content:'$content',endTime:'$endTime',startTime:'$startTime'},count:{$sum:1},dups:{$addToSet:'$_id'}}
    },
    {
        $match:{count:{$gt:1}}
    }
      //对数组进行遍历，参数it就是当前每一个文档键值对，每一个文档键值对，就是一个分组，每个分组都有 count字段和dups字段
    ]).forEach(function(it){
        //开始进行删除掉所有重复项
        it.dups.shift();
        //删除当前分组中的所有索引对应的文档
        db.Passages.remove({_id: {$in: it.dups}});

    });