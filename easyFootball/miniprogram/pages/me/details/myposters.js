// miniprogram/pages/me/details/posters.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myposters:[],
    posterscnt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
    })
  }

    var that =this
    wx.cloud.callFunction({
      name:'forum',
      data:{
        type:'myPosters',
        openId:app.globalData.openId
      },
      success:function(res){
        that.setData({
          posterscnt:res.result.length,
          myposters:res.result
        })
        console.log(that.data.myposters)
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

  }
})