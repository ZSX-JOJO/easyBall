const app = getApp()

Page({
  data: {
    name:'fuck'
  },

  onLoad: function (options) {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 3
    })
  }
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    console.group('数据库"实时数据推送"文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/realtime.html')
    console.groupEnd()
  },
})
