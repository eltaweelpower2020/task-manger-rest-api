require('../src/db/mongoose')
const Task=require('../src/modals/task')

// Task.findByIdAndRemove('5edb855780bb89293c071c2b').then(()=>{
//     return Task.count({completed:false})
// }).then((totalcount)=>{
//     console.log(totalcount);
// }).catch((e)=>{
//     console.log(e);
// })
const removeAndCount =async (id)=>{
    const findAndRemove = await  Task.findByIdAndRemove(id)
    const totalCount =await  Task.count({completed:false})
    return totalCount
}

removeAndCount('5edb854c80bb89293c071c2a').then((count)=>{
   console.log(count)
}).catch((error)=>{
    console.log(error)
})