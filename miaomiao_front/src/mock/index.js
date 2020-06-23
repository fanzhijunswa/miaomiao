import Mock from 'mockjs'

Mock.mock('/api/getMovie', 'get', () => {
  const arr = ["@cword(2)", "@cword(2)", "@cword(2)", "@cword(2)", "@cword(2)"]
  return Mock.mock({
    "data|60-100": [
      {
        film_img: "@image('200x100')",
        film_title: "@cword(5,10)",
        film_score: "@float(0,10,1,1)",
        film_type: arr.slice("@integer(0,4)"),
        film_actor: arr.slice("@integer(0,4)"),
        film_time: "@date()",
        film_detail_id: /\d{6}/,
        film_evr: /[a-zA-z0-9]{4,7}/
      }
    ]
  })
})
