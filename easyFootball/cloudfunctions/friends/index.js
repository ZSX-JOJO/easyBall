// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const db = cloud.database()
  if (event.type == 'addFriend') {
    let res = await db.collection('friends').add({
      data: {
        _id:`${event.me}${event.myFriend}`,
        me: event.me,
        myFriend: event.myFriend,
        myFriendName: event.myFriendName,
        myFriendAvatarUrl: event.myFriendAvatarUrl
      }
    })
  } else if (event.type == 'getMyFriend') {
    try {
      console.log(event.openId)
      let res = await db.collection('friends').where({
        me:event.openId
      }).get()
      return res
    } catch (e) {
      console.log(e)
    }

    
  }
  else if(event.type=='delete'){
    try{
      let res=await db.collection('friends').where({
        me:event.myopenId,
        myFriend:event.friendId
      }).remove()
    }catch(e){
      console.log(e)
    }
  }

}