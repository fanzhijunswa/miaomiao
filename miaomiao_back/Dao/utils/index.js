/*每个模块都需要有增删改查操作，所以我将几个功能封装到了这个utli.js中，模块想要用的话直接导入 
 */

const myFind = function (data = {},{_limit,_skip,_sort} = {_limit:false,_skip: false,_sort: false}) {
  //在此判断输入的有没有limit和skip或者sort
  let BASIC_HEAD = `this.find(data)${_sort ? '.sort(_sort)' : ''}${_skip ? '.skip(_skip)' : ''}${_limit ? '.limit(_limit)':''}`
  return new Promise((resolve,reject) => {
      eval(BASIC_HEAD).exec(((err,data) => {
          if(err) {reject(err);return false}
          resolve(data)
      }))
  })
}

const myDelete = function (data = {},flag) {
  return new Promise((resolve,reject) => {
      this[!!flag ? 'deleteMany' : 'deleteOne'] (data,(err,{deletedCount}) => {
          if(err) {reject(err);return false}
          resolve(`删除了${deletedCount}条数据`)
      })
  })
}

const myUpdate = function (filter,update,flag) {
  return new Promise((resolve,reject) => {
      this[!!flag ? 'updateMany' : 'updateOne'] (filter,update,(err,data) => {
          if(err) {reject(err);return false}
          console.log(data)
          resolve()
          // resolve(`删除了${deletedCount}条数据`)
      })
  })
}

const mySave = function () {
  return new Promise((resolve,reject) => {
      this.save(err => {
          if(err) {reject(err);return false}
          resolve()
      })
  })
}

exports.myFind = myFind
exports.myDelete = myDelete
exports.myUpdate = myUpdate
exports.mySave = mySave
