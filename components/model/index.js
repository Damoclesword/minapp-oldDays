// components/model/index.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //暂时不自定义model的动画
    animationModel: {
      type: Object
    },
    isShow: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationBg: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * public function
     */
    //显示Model
    showModel: function () {
      let that = this;
      //底部弹出动画
      let animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0
      });
      //overlay透明度动画
      let animationBg = wx.createAnimation({
        duration: 400,
        timingFunction: "ease",
        delay: 0
      });
      this.setData({
        isShow: true
      });
      this.animation = animation;
      this.animationBg = animationBg;
      setTimeout(function () {
        that._fadeIn();
      }, 200);
    },

    //隐藏Model
    hideModel: function () {
      let that = this;
      //底部弹出动画
      let animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0
      });
      //overlay透明度动画
      let animationBg = wx.createAnimation({
        duration: 500,
        timingFunction: "ease",
        delay: 0
      });
      this.animation = animation;
      that._fadeOut();
      setTimeout(function () {
        that.setData({
          isShow: false,
        });
      }, 300);
    },

    /**
     * private function
     */
    //淡入动画 
    _fadeIn: function () {
      this.animation.translateY(0).step();
      this.animationBg.opacity(0.5).step();
      this.setData({
        animationModel: this.animation.export(),
        animationBg: this.animationBg.export()
      });
    },

    //淡出动画
    _fadeOut: function () {
      this.animation.translateY("100%").step();
      this.animationBg.opacity(0).step();
      this.setData({
        animationModel: this.animation.export(),
        animationBg: this.animationBg.export()
      });
    },

    //阻止滚动
    _preventTouchMove: function () {}
  }
});