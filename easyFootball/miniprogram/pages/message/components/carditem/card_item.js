Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    type:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    post: {},
    converse:{
      tabletennis:'乒乓球',
      football:'足球',
      basketball:'篮球',
      badminton:'羽毛球'

    }
  },
  attached:function(){
    console.log(this.data.type)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTap() {
      console.log('tap')
    },
    showResult(e) {
      console.log(e)
      this.setData({
        value: e.detail.value
      })
      this.setData({
        ["post.name"]: this.properties.itemData.name,
        ["post.position"]: this.properties.itemData.position,
        ["post.project"]: this.properties.itemData.project,
        ["post.score"]: e.detail.value
      })
      //console.log(this.data.post)
    },
    post() {
      if (this.data.post.score == null)
        wx.showToast({
          title: '还未评分',
          icon: 'none'
        })
      console.log(this.data.post)
    }
  }
})