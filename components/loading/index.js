// components/loading/index.js
Component({
  behaviors: ['wx://component-export'],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    animationCss: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //显示下拉刷新动画
    showLoading: function () {
      this.setData({
        animationCss: "slide-in"
      })
    },

    //隐藏下拉刷新动画
    hideLoading: function () {
      let that = this;
      setTimeout(() => {
        that.setData({
          animationCss: ""
        })
      }, 300);
    }
  }
})