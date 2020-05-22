// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
 // console.log('fuck')
  try{
    return await db.collection('forum').add({
      data:event,
      success:(e)=>{console.log(e)}
    })
  }catch(e){
    console.log(e)
  }
  
}