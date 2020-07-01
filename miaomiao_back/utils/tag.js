const Tag = require('../Dao/tag')
const _ = require('lodash')
let tagList = {
  0: ['热门','hot'],
  1: ["最新",'new'],
  2: ["经典",'classic'],
  3: ["可播放",'play'],
  4: ["豆瓣高分",'high'],
  5: ["冷门佳片",'cold']
}

_.forEach(tagList,([cname,ename],key) => {
  let tag = new Tag({tag:key,cname,ename})
  tag.save()
})

