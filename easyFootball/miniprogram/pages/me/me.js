// pages/page1/page1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: app.globalData.openId,
    myinf: app.globalData.userInfp,
    infshow: {
      school: '四川大学',
      goodat: '足球',
      grade: '优秀'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置本页中自定义tabBar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.openId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      openId: app.globalData.openId,
      userInfo: app.globalData.userInfo
    })
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
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this.data.userInfo)
    console.log(app.globalData.userInfo)
    wx.login({
      complete: (res) => {
        console.log(`登陆结果${res.code}`)
        this.getOpenID()
      },
    })

  },

  getOpenID: async function () {


    const {
      result
    } = await wx.cloud.callFunction({
      name: 'login',
    })
    app.globalData.openId = await result.openid
    this.setData({
      openId: app.globalData.openId,
    })

    console.log('openId' + result)

  },
  // 页面跳转
  myPost: function (e) {
    wx.navigateTo({
      url: 'details/myposters',
    })
  }



})