const mongoose=require('mongoose')

const uris='mongodb://127.0.0.1:27017/task-manger-api'
mongoose.connect(uris,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})





