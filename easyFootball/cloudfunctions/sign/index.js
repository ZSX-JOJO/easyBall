// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  
  const db = cloud.database()
  if(event.type=='sign'){
    console.log(event)
    try {
      let res = await db.collection('sign').add({
        data:{
          _id:`${event.id}${event.openId}`,
          id:event.id,
          name:event.name,
          openId:event.openId,
          avatarUrl:event.avatarUrl
        }
      })
      console.log(res.data)
      return await res.data
    } catch (e) {
      console.log(e)
    }
  }
  else if(event.type=='getInf'){
      let res=await db.collection('sign').where({
        id:event.id
      }).get()
      return await res
  }
  else if(event.type=='mysign'){
    console.log(event)
    let res=await db.collection('sign').where({
      openId:event.openId
    }).get()
    let forumId=res.data
    var result=[]
    for(let i=0;i<forumId.length;i++){
      let posts=await db.collection('forum').where({
        _id:forumId[i]._id
      }).get()
      result.push(posts.data[0])
    }
    console.log(result)
    return await result
  }
  else if(event.type=='delete'){
    console.log(event.id)
    let res=await db.collection('sign').where({
      id:event.id,
      openId:event.openId
    }).remove()
  }
  
}