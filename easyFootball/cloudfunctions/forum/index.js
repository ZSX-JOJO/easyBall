// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.type === 'initForum') {
    const db = cloud.database()
    try {
      let res = await db.collection('forum').get()
      console.log(res.data)
      return await res.data
    } catch (e) {
      console.log(e)
    }
  }
  else if(event.type==='myPosters'){
    const db = cloud.database()
    try{
      let res=await db.collection('forum').where({
        ['userInfo.openId']:event.openId
      }
        
      ).get()
      return await res.data
    }catch(e){console.log(e)}
  }


}