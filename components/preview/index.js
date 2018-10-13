// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    previewData: {
      type: Object,
      observer: function(newVal) {
        if (newVal) {
          const typeText = {
            100: "电影",
            200: "音乐",
            300: "句子",
          }[newVal.type]
          this.setData({
            typeText,
          })
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: "电影",
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})
