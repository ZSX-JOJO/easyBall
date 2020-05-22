// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  
      console.log(event.code)
      // wx.request({
      //   url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx1f6059593948d51e&secret=2bcef1c8a8c9c35c720c3818c8b86266&js_code=${event.code}&grant_type=authorization_code`,
      //   method:'GET'
      // })


}