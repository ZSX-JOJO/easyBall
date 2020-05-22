// miniprogram/pages/index/post.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postinf:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postinf:app.globalData.postinf
    })
    console.log(app.globalData.postinf)
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
  post:function(e){
    wx.cloud.callFunction({
      name: 'post',
      data: this.data.postinf,
      success: (res) => {
        wx.showToast({
          title: '发表成功！',
          icon:'success',
         duration:1500
        })
        wx.navigateBack({
          complete: (res) => {
            wx.showToast({
              title: '发表成功，请下拉刷新论坛查看',
              icon:'none',
              duration:1500
            })
          },
        })
      }
    })
  },
  cancel:function(e){
    app.globalData.postinf={},
    wx.navigateBack({
      complete: (res) => {},
    })
  }
})