const validator =require('validator')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if (value<0)  {
                throw new Error ('error ya mariam ')
            }
        }
    },
    email:{
        type:String,
        unique:true, 
        required:true,
        trim:true,
        lowercase:true,
        validate(emailValue){
            if (!validator.isEmail(emailValue)) {
                throw new Error ('it is invalid email ya pop ')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error('password cant contain password ')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true,

        }
    }]
})

//==================================================================
userSchema.methods.toJSON= function () {
    user=this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
//=====================================================================
userSchema.methods.generateAuthToken=async function (){
    const user=this
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcource')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}
//======================================================================
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if (!user) {
        throw new Error("no email founded")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
        throw new Error("not match password wrong password")
    }
    return user
}

//======================================================================
//--------------before save hash password
 userSchema.pre('save',async function (next) {
     const user=this
     if (user.isModified('password')) {
         
         user.password=await bcrypt.hash(user.password,8)
     }
     next()
 })

const User=mongoose.model('User',userSchema)


module.exports=User
