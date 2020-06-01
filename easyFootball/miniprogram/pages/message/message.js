//index.js
//获取应用实例
const app = getApp()
const nameList = [{
  name: 'harry',
  project: 'basketball'
}, {
  name: '欠欠',
  project: 'football'
}, {
  name: '欠欠的男朋友',
  project: 'badminton'
}, {
  name: '男朋友的欠欠',
  project: 'tabletennis'
}];
var cnt = -1;
const generateItem = () => {
  cnt++;
  return {
    // id: Math.floor(Math.random() * 1000),
    name: nameList[cnt].name,
    project: nameList[cnt].project,
    position: 'fuck'
  }
}
Page({
  data: {
    pushList: [
      generateItem(),
      generateItem(),
      generateItem(),
      generateItem()
    ],
    pushList_change:[],
 
    converse: {
      tabletennis: '乒乓球',
      football: '足球',
      basketball: '篮球',
      badminton: '羽毛球'

    },
    title: ["打分通知", "系统通知"],
    currentIndex: "0",
    left: "",
    type: 'grade'

  },
  //事件处理函数
  bindViewTap: function () {

  },
  changeTab: function (e) {
    //console.log(e)
    this.setData({
      currentIndex: e.currentTarget.dataset.aa
    })
    this.changeline(e)
    if (this.data.type == 'grade')
      this.setData({
        type: 'change'
      })
    else
      this.setData({
        type: 'grade'
      })
  },
  changeline: function () {
    const query = wx.createSelectorQuery()
    var _this = this
    query.select('.tabTrue').boundingClientRect()
    query.exec(function (res) {
      _this.setData({
        left: res[0].left
      })
      //console.log(res[0].left)
    })
  },
  onLoad: function () {

    this.changeline(1)
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    var that=this
    wx.cloud.callFunction({
      name:'changeInf',
      data:{
        openId: app.globalData.openId
      },
      success:(res)=>{
        console.log(res)
        that.setData({
          pushList_change:res.data
        })
      }
    })
  },
  handleSwipeOut(...args) {
   
    cnt = -1;
    this.setData({
      pushList: [
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem()
      ]
    })
    //console.log(args)
  },
  handleClickCard(...args) {
    console.log(args)
  },
  getUserInfo: function (e) {

  },

  onPullDownRefresh: async function () {
    wx.cloud.callFunction({
      name:'changeInf',
      data:{
        openId: app.globalData.openId
      },
      success:(res)=>{
        console.log(res)
      }
    })
  },

})