// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  console.log(event.openId)
  var myforum=[]
  var result=[]
    try {
      let res = await db.collection('sign').where({
        openId:event.openId
      }).get()
     myforum=res.data
     console.log(myforum)
     try{
       for(let i=0;i<myforum.length;i++){
        let res=await db.collection('deleted').where({
          _id:myforum[i]._id
        }).get()
        if(res.data.length!=0)
         result.push(res.data)
       }
       console.log(result)
     }catch(e){
       console.log(e)
     }
      
    } catch (e) {
      console.log(e)
    }
}