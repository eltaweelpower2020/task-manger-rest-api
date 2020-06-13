const validator =require('validator')
const mongoose=require('mongoose')

const Task=mongoose.model('Task',{
    description :{
        type:String,
        required:true,
        trim:true
    },
    completed :{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports=Task