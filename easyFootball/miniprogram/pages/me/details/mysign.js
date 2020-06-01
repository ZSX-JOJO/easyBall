// miniprogram/pages/me/details/mysign.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mysign: [],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var openId=app.globalData.openId
    var that = this
    wx.cloud.callFunction({
      name: 'sign',
      data: {
        type: 'mysign',
        openId:openId
      },
      success:(res)=>{
        console.log(res)
        that.setData({
          mysign:res.result.reverse()
        })
        console.log(that.data.mysign)
      }
    })
  },
  tap(){
    wx.showToast({
      title: '长按取消报名',
      icon: 'none',
      duration: 1000,
      mask:true
  })
  },
  longtap(e){
    var that=this
    var i=e.currentTarget.id
    var openId=app.globalData.openId
    console.log (i)
    wx.cloud.callFunction({
      name:'sign',
      data:{
        type:'delete',
        id:that.data.mysign[i].id,
        openId:openId
      },
      success(res){
        wx.cloud.callFunction({
          name: 'sign',
          data: {
            type: 'mysign',
            openId:openId
          },
          success:(res)=>{
            console.log(res)
            that.setData({
              mysign:res.result
            })
          }
        })
       
        wx.showToast({
          title: '取消成功！',
          icon: 'success',
          duration: 1000,
          mask:true
      })
      }
    })
    console.log(e)
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

  }
})