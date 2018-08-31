// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    latest: {
      type: Boolean,
      value: true
    },
    first: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: "./images/triangle@left.png",
    rightSrc: "./images/triangle@right.png",
    disLeftSrc: "./images/triangle.dis@left.png",
    disRightSrc: "./images/triangle.dis@right.png"
  },

  /**
   * navi-component生命周期
   */

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function (event) {
      if (!this.properties.latest)
        this.triggerEvent("left", {}, {});
    },
    onRight: function (event) {
      if (!this.properties.first)
        this.triggerEvent("right", {}, {});
    }
  }
});