const express = require('express')

const User=require('../modals/user')

const auth = require('../middleware/auth')

const router =express.Router()
//=====================================================
router.post('/users',async (req,res)=>{
    const addNewUser =new User(req.body)
    try {
        await addNewUser.save()
        const token=await addNewUser.generateAuthToken()
        console.log({addNewUser,token});
        
        res.status(201).send({addNewUser,token})
    } catch (error) {
        res.status(400).send({errorMsg:'error from catch',error})
    }
                 })

//-------------login in credintials ---------------//
router.post('/users/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        
        res.send({user,token})
    
    } catch (error) {
        res.status(400).send({errorMSG:'error from catch',error})
    }
                })     
//-----------------------------------------------------------------------------//
router.post('/users/logout',auth,async (req,res)=>{
    try {
        console.log('hello from try',req)
        req.ahmed.tokens = req.ahmed.tokens.filter((token)=>{
            return token.token !== req.token 
        })
        await req.ahmed.save()
        res.send(req.ahmed)
    } catch (error) {
        res.status(500).send({errMsg:'error from catch'})
    }
})
//-----------------------------------------------------------------------------//
router.post('/users/logoutall',auth,async (req,res)=>{
    try {
        req.ahmed.tokens = req.ahmed.tokens.filter((token)=>{
            return token.token == []
        })
        await req.ahmed.save()
        res.send(req.ahmed)
    } catch (error) {
        res.status(400).send({errMsg:'error from catch'})
    }
})
//-----------------------------------------------------------------------------//
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.ahmed)
})
//------------------------------no need now /me it is ok -----------------------------------------------//
// router.get('/users/:id',async (req,res)=>{
//     const _id = req.params.id
//     try {
//         const userById= await User.findById(_id)
//         if (!userById) {
//             return res.status(404).send({error:"no user found"})
//         } else {
//             res.status(202).send(userById)
//         }
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
//-----------------------------------------------------------------------------//
router.patch('/users/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates =['name','email','password','age']
    const isValidOperation=updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error:'not allowed parameter to update'})
    }
    try {

        const user=req.ahmed
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        await user.save()
        res.status(202).send(user)
    } catch (error) {
        res.status(500).send({error:'error from catch'})
    }
})
//-----------------------------------------------------------------------------//
router.delete('/users/me',auth,async (req,res)=>{
    try {
        // const userDelete=await User.findByIdAndDelete(req.ahmed._id)
        // if (!userDelete) {
        //     return res.status(404).send({error:'there is no user found to delete '})
        // }
        await req.ahmed.remove()
        res.status(202).send({sucsses:'user was deleted ',user:req.ahmed})
    } catch (error) {
        res.status(500).send({error:'error from catch'})
    }
})



module.exports=router