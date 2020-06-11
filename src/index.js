const express=require('express')

const auth = require('./middleware/auth')



const app = express()
require('./db/mongoose')



const userRouter=require('./routes/users')

const taskRouter=require('./routes/tasks')

app.use(express.json())  //to create data in json frommat and create req.body data

const port = process.env.PORT || 3000



//==================middelware==========================================================================
// app.use((req,res,next)=>{
//     if (req.method === 'POST') {
//         res.send({msg:'error from get request'})
//     }else {
//         next()
//     }
// })



//================================================================================================================================
app.use('/',taskRouter)
app.use('/',userRouter)
//================================================================================================================================
// var bcrypt = require('bcryptjs')

// const myFunction = async ()=> {
//     const password = '123red!';
//     const hashPassword=await bcrypt.hash(password,8) 
//     console.log(password)
//     console.log(hashPassword)
//     const results=await bcrypt.compare(password,hashPassword)
//     console.log(results);
    
// }
// myFunction()
//================================================================================================================================
// var jwt = require('jsonwebtoken');

// const myFunction = async ()=> {
//     var token = jwt.sign({ _id: 'ba123abcr' }, 'secret cahracter',{expiresIn:'7 days'})
//     console.log(token)
//     var verify =jwt.verify(token,'secret cahracter')
//     console.log(verify)
// }
// myFunction()
//================================================================================================================================

app.listen(port,()=>{
    console.log('server is up on port :' + port)
})