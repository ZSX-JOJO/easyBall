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
  tap(){
    wx.showToast({
      title: '长按删除帖子',
      icon: 'none',
      duration: 1000,
      mask:true
  })
  },
  longtap(e){
    
  var that=this
  var i=e.currentTarget.id
  console.log (i)
  wx.cloud.callFunction({
    name:'delete',
    data:{
      _id:that.data.myposters[i]._id,
      poster:that.data.myposters[i].postername,
      project:that.data.myposters[i].project,
      tip:that.data.myposters[i].tips,
      position:that.data.myposters[i].position,
      time:`${that.data.myposters[i].year}年 ${that.data.myposters[i].month}月 ${that.data.myposters[i].day}日 ${that.data.myposters[i].hour}时 ${that.data.myposters[i].minute}`
    },
    success(res){
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
     
      wx.showToast({
        title: '删除成功！',
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

  },
  
})
