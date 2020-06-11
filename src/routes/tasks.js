
const express = require('express')
const Task=require('../modals/task')
const router = express.Router()

router.post('/tasks',async (req,res)=>{
    const addNewTask =new Task(req.body)  
    try {
        await addNewTask.save()
        res.status(201).send(addNewTask)
    } catch (error) {
        res.status(400).send(error)
    }
                            // addNewTask.save()
                            // .then((task)=> {
                            //     res.status(201).send(task)
                            // })
                            // .catch((error)=> {
                            //     res.status(400).send(error)
                            // })
})

//----------------------//

router.get('/tasks',async (req,res)=>{
    try {
        const allTasks =await Task.find({})
        console.log(allTasks);
        res.status(202).send(allTasks)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
                                // Task.find({}).then((allTasks)=>{
                                //     console.log(allTasks);
                                //     res.status(202).send(allTasks)
                                // }).catch(error => {
                                //     console.log(error);
                                //     res.status(500).send(error)
                                // })
})
//-----------------------//
router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id
    try {
        const task=await  Task.findById(_id)
            if (!task) {
                return res.status(404).send({error:"no task found"})
                }else {
                     res.status(202).send(task)
                    }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
                            // Task.findById(_id).then((task)=>{
                            //     if (!task) {
                            //         return res.status(404).send({error:"no task found"})
                            //     }else {
                            //         res.status(202).send(task)
                            //     }
                            // }).catch(error => {
                            //     console.log(error);
                            //     res.status(500).send(error)
                            // })
})


router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['description','completed']
    const isValidOperation=updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error:'not allowed parameter to update'})
    }
    try {
        const task=await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        // const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true , runValidators: true })
        if (!task) {
            return res.status(404).send({error:'there is no task found '})
        }
        res.status(202).send(task)
    } catch (error) {
        res.status(500).send({error})
    }
})

router.delete('/tasks/:id',async (req,res)=>{
    try {
        const taskDelete=await Task.findByIdAndDelete(req.params.id)
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