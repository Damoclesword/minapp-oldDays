// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookData: {
      type: Object,
      observer: function (newVal, oldVal) {
        // console.log(newVal);
      }
    },
    showType: {   //0:box样式  1:list条形样式
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      const bid = this.properties.bookData.id;
      this.triggerEvent(
        "book-detail", {
          bid
        }
      );
    }
  }
})