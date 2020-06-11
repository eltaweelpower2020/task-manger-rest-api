const jwt = require('jsonwebtoken')
const User=require('../modals/user')
const auth =async (req,res,next)=>{
   try {
       const token = req.header('authorization').replace('Bearer ','')
       const decoded = jwt.verify(token,'thisismynewcource')
       const user =await User.findOne({_id:decoded._id,'tokens.token':token})
       if (!user) {
           throw new Error('no user found ')
       }
       req.ahmed=user
       req.token=token
       next()
   } catch (error) {
       res.status(401).send({error:'plz autheniticate '})
   }
}

module.exports=auth


// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRmZjQyOGUzYmU5MTNlY2NmODUyOGIiLCJpYXQiOjE1OTE3ODA1NDd9.K6PsoZuS-wOL151-nQIcSh2lAtYdQWUWYUOgEZWWjdk"
//authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRmZjQyOGUzYmU5MTNlY2NmODUyOGIiLCJpYXQiOjE1OTE3ODA1NDd9.K6PsoZuS-wOL151-nQIcSh2lAtYdQWUWYUOgEZWWjdk