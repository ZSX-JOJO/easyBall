// miniprogram/pages/me/details/myFriends.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myFriends:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openId=app.globalData.openId
    var that=this
    wx.cloud.callFunction({
      name:'friendship',
      data:{
        type:'getMyFriend',
        openId:openId,

      },
      success:(res)=>{
        console.log(res)
        that.setData({
          myFriends:res.result.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tap(){
    wx.showToast({
      title: '长按删除好友',
      icon: 'none',
      duration: 1000,
      mask:true
  })
  },
  longtap(e){
    var that=this
    var i=e.currentTarget.id
    var openId=app.globalData.openId
    console.log(that.data.myFriends[i])
    wx.cloud.callFunction({
      name:'friendship',
      data:{
        type:'delete',
        myopenId:openId,
        friendId:that.data.myFriends[i].myFriend
      },
      success:(res)=>{
        wx.showToast({
          title: '删除成功!',
          icon: 'success',
          duration: 1000,
          mask:true
      })
      }
    })
  }
})