
const express = require('express')
const Task=require('../modals/task')
const router = express.Router()
const auth = require('../middleware/auth')
///////////////////////////////////////////////////////

router.post('/tasks',auth,async (req,res)=>{
    const addNewTask = new Task({
        ...req.body,
        owner:req.ahmed._id
    })

    try {
        await addNewTask.save()
        res.status(201).send(addNewTask)
    } catch (error) {
        res.status(400).send(error)
    }

})

//----------------------//

router.get('/tasks',auth,async (req,res)=>{
    try {
        const userId= req.ahmed._id
        // const allTasks =await Task.find({owner:userId})
        await req.ahmed.populate('tasks').execPopulate()
        res.status(202).send(req.ahmed.tasks)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
    
})
//-----------------------//
router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try {
        const task=await Task.findOne({_id,owner:req.ahmed._id})
            if (!task) {
                return res.status(404).send({error:"no task found"})
                }else {
                     res.status(202).send(task)
                    }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})
//----------------------------------------//

router.patch('/tasks/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['description','completed']
    const isValidOperation=updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error:'not allowed parameter to update'})
    }
    try {
        const task=await Task.findOne({_id:req.params.id,owner:req.ahmed._id})
        if (!task) {
            return res.status(404).send({error:'there is no task found '})
        }
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        res.status(202).send(task)
    } catch (error) {
        res.status(500).send({error})
    }
})

router.delete('/tasks/:id',auth,async (req,res)=>{
    try {
        const taskDelete=await Task.findOneAndRemove({_id:req.params.id,owner:req.ahmed._id})
        if (!taskDelete) {
            return res.status(404).send({error:'there is no task found to delete '})
        }
        res.status(202).send({sucsses:'task was deleted '})
    } catch (error) {
        res.status(500).send({error:'error from catch'})
    }
})

//==========================================================================================================



module.exports=router