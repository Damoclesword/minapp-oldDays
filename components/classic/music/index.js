// components/classic/music/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String
    },
    content: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: "./images/player@playing.png",
    pauseSrc: "./images/player@waitting.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {}
});
