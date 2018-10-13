Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false,
      observer: function() {},
    },
    count: {
      type: Number,
    },
    art_id: {
      type: Number,
    },
    type: {
      type: Number,
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: "images/like.png",
    dissLikeSrc: "images/like@diss.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      //不可点击状态
      if (this.properties.readOnly) return
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like,
      })
      let behaviour = this.properties.like ? "like" : "cancel"
      this.triggerEvent(
        "like",
        {
          behaviour: behaviour,
        },
        {}
      )
    },
  },
})
