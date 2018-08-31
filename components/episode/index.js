// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function (newVal, oldVal, changePath) {
        //个位数时填充0
        let f_index = newVal < 10 ? "0" + newVal : newVal;
        this.setData({
          f_index: f_index
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: "",
    f_index: ""
  },

  /**
   * Compomnent生命周期函数
   */
  ready: function () {},

  /**
   * 组件的方法列表
   */
  methods: {}
});