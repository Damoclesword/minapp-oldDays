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
    months: [
      '一月','二月','三月','四月','五月','六月',
      '七月','八月','九月','十月','十一月','十二月',
    ],
    year: 0,
    month: "",
    f_index: ""
  },

  /**
   * Compomnent生命周期函数
   */
  attached: function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    this.setData({
      year: year,
      month: this.data.months[month]
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {}
});