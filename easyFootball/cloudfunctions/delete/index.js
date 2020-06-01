// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const db = cloud.database()
    try {
      let res = await db.collection('forum').where({
        _id:event._id
      }).remove()
      
    } catch (e) {
      console.log(e)
    }
    try{
      let res=await db.collection('deleted').add({
       data:{
        _id:event._id,
        poster:event.poster,
        position:event.position,
        time:event.time,
        tip:event.tip,
        project:event.project
       }
      })
    }catch(e){
      console.log(e)
    }
   
}