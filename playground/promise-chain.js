require('../src/db/mongoose')
const User =require('../src/modals/user')
const Task =require('../src/modals/task')

//   5edb86531d771c32b40e093e

const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count =await User.countDocuments({age}) 
    return {user,count}
}
updateAgeAndCount('5edb86531d771c32b40e093e',50000000000)
.then((result)=>{
    console.log(result);
})
.catch((error)=>{
    console.log(error);
})



// const doWork =async ()=>
// {
//     await User.findByIdAndUpdate("5edb86531d771c32b40e093e",{
//     age:1
//     })
//     return await User.countDocuments({age:1}) 
// }
// doWork().then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })



// User.findByIdAndUpdate("5edb86531d771c32b40e093e",{
//     age:3
// }).then((result)=>{
//    return User.countDocuments({age:3}) 
// }).then((result1)=>{
//     console.log(result1)
// })
// .catch((e)=>{
//     console.log(e);
    
// })