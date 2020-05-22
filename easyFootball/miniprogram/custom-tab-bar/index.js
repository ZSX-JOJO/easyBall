Component({
  lifetimes: {
    
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log('tabBar attached');
      console.log(this);
    
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      console.log('tabBar detached');
      console.log(this);
    },
  },
  
  /**
   * 组件的初始数据
   */
  data: {

  
    color: "#999999",
    selectedColor: "rgb(34, 204, 43)",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "/pages/me/me",
        iconPath: "/custom-tab-bar/icon/me.png",
        selectedIconPath: "/custom-tab-bar/icon/me_c.png",
        text: "我的"
      },
      {
        pagePath: "/pages/message/message",
        iconPath: "/custom-tab-bar/icon/message.png",
        selectedIconPath: "/custom-tab-bar/icon/message_c.png",
        text: "通知"
      },
      {
        pagePath: "/pages/index/index",
        iconPath: "/custom-tab-bar/icon/home_c.png", 
        selectedIconPath: "/custom-tab-bar/icon/tab.gif",
        isSpecial: true, // 标记特殊图标---中间那个
        text: "社区"
      },
      {
        pagePath: "/pages/chat/chat",
        iconPath: "/custom-tab-bar/icon/chat.png",
        selectedIconPath: "/custom-tab-bar/icon/chat_c.png",
        text: "聊天"
      },
      {
        pagePath: "/pages/match/match",
        iconPath: "/custom-tab-bar/icon/match.png",
        selectedIconPath: "/custom-tab-bar/icon/match_c.png",
        text: "比赛"
      }
    ]
  },
  attached() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      console.log(e.currentTarget.dataset);
      const data = e.currentTarget.dataset
      const url = data.path
      // console.log('before');
      // console.log(this);
      wx.switchTab({ url })
      /* this.setData({
        selected: data.index
      }) */
      // console.log('after');
      // console.log(this);
    }
  }
})
