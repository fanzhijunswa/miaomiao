const jwt = require('jsonwebtoken')
exports.middle = (req,res,next) => {
  const { authorization:token } = req.headers
  if(token && !/^\/user/.test(req.url)) {
    jwt.verify(token, 'inthecloset',(err,decoded) => {
      if(err) {
        return res.status(900).send('token过期')     
      }
      next()
    });
  }else {
    next()
  }
}