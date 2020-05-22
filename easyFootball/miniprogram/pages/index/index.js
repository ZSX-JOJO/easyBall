

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    openId: app.globalData.openId,
    motto: '登陆',
    yueqiu:true,
    i:'',
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    fold: true,
    morefold: true,
    // 这里需要后来代码重构，写得太丑了
    commentdisplay: "display:none",
    tiezidispaly: "flex",
    tagdisplay:"flex",
    forum: [],
    postinf: {
      posterId: '',
      postername:'',
      posterAvatar:'',
      project: '',
      year: '',
      month: '',
      day: '',
      hour:'',
      minute:'',
      position: '',
      tips: '',
    },
    title: ["约球","比赛"],
  currentIndex:"0",
  left:""
  },

  changeTab:function(e){
    //console.log(e)
    this.setData({
     currentIndex: e.currentTarget.dataset.aa
    })
    this.changeline(e)
    this.setData({
      yueqiu:(this.data.yueqiu==false?true:false)
    })
   },
   changeline:function(){
    const query = wx.createSelectorQuery()
    var _this = this
    query.select('.tabTrue').boundingClientRect()
    query.exec(function (res) {
      console.log(res[0])
     _this.setData({
      left: res[0].left-5
     })
     //console.log(res[0].left)
    })
   },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
//监听下拉刷新
onPullDownRefresh: async function () {
  await this.getOpenID()
  await this.onLoad();
},

  onLoad: function () {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效.
   this.setData({left:80})
    console.log('loaded')
    wx.cloud.init()
    this.getforum()

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(this.data.userInfo)
    console.log(this.data.canIUse)
    console.log(this.data.hasUserInfo)

    // 设置本页中自定义tabBar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  onReady: function () {
      
  },
  onShow:function(e){
    this.setData({
      openId:app.globalData.openId,
      userInfo:app.globalData.userInfo
    })
  },
  // 登陆
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
  getforum:async function(){
    
    await wx.cloud.callFunction({
      name:'forum',
      data:{
        type:'initForum'
      },
      success:(res)=>{
        
        this.setData({
          forum:res.result
        })
      }
    })
    
  },
  getOpenID: async function() {
   

    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })
   app.globalData.openId=  await result.openid
    this.setData({
      openId:app.globalData.openId,
    })
    
    console.log('openId'+result)
   
  },
  
  fold: function (e) {
    this.setData({
      fold: true,
      morefold: true
    })
  },
  unfold: function (e) {
   
    this.setData({
      fold: false,
      i:e.currentTarget.id
    })
  },
  morefold: function (e) {
    var that = this
    if (that.data.morefold == true) {
      this.setData({
        morefold: false
      })
    } else {
      console.log('fuck')
      this.setData({
        morefold: true
      })
    }


  },
  commentunfold: function (e) {
    this.setData({
      commentdisplay: "display:flex;",
      tiezidispaly: "none",
      tagdisplay:'none'
    })

  },
  commentfold: function (e) {
    this.setData({
      commentdisplay: "display:none;",
      tiezidispaly: "flex",
      tagdisplay:'flex'
    })
  },
  projectfoot: function (e) {
    this.setData({
      ['postinf.project']: 'football'
    })
  },
  projectbas: function (e) {
    this.setData({
      ['postinf.project']: 'basketball'
    })
  },
  projectbad: function (e) {
    this.setData({
      ['postinf.project']: 'badminton'
    })
  },
  projecttab: function (e) {
    this.setData({
      ['postinf.project']: 'tabletennis'
    })
  },
  inputyear: function (e) {
    this.setData({
      ["postinf.year"]: e.detail.value
    })
  },
  inputmonth: function (e) {
    this.setData({
      ["postinf.month"]: e.detail.value
    })
  },
  inputday: function (e) {
    this.setData({
      ["postinf.day"]: e.detail.value
    })
  },
  inputhour: function (e) {
    this.setData({
      ["postinf.hour"]: e.detail.value
    })
  },
  inputminute: function (e) {
    this.setData({
      ["postinf.minute"]: e.detail.value
    })
  },
  inputposition: function (e) {
    this.setData({
      ["postinf.position"]: e.detail.value
    })
  },
  inputtips: function (e) { this.setData({ ["postinf.tips"]: e.detail.value }) },
  post: function (e) {
    console.log('fuck')
    var that = this
    console.log(that.data.postinf)
    if (that.data.postinf.project == "" || that.data.postinf.year == "" || that.data.postinf.month == "" || that.data.postinf.day == "" || that.data.postinf.hour == "" || that.data.postinf.minute == "" || that.data.postinf.position == "" || that.data.postinf.tips == "")
      wx.showToast({
        title: '请填写完整',
        icon: 'none'
      })

    
    else {
      that.setData({
        ['postinf.posterId']:that.data.userInfo,
        ['postinf.postername']:that.data.userInfo.nickName,
        ['postinf.posterAvatar']:that.data.userInfo.avatarUrl
      })
      app.globalData.postinf=this.data.postinf
      wx.navigateTo({
        url: `./post`,
      })
    }
   
  }
})