// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword'
import {
  BookModel
} from "../../models/book"
const keyword = new KeywordModel();
const book = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    histories: [],
    hot: [],
    resultData: [],
    inputValue: "",
    searched: false
  },

  attached: function () {
    console.log("search attached");
    let histories = keyword.getHistory();
    this.setData({
      histories
    });
    keyword.getHot()
      .then(res => {
        this.setData({
          hot: res.hot
        })
      });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //关闭搜索面板
    onCancel: function () {
      this.triggerEvent("search-cancel", {});
    },

    //清除搜索
    onDelete: function () {
      this.setData({
        inputValue: "",
        searched: false
      });
    },

    //确认搜索
    searchConfirm: function (event) {
      this.setData({
        searched: true
      });
      const q = event.detail.value || event.detail.text; //从输入框或者点击获取搜索内容
      this.setData({
        inputValue: q
      });
      book.search(0, 0, q)
        .then(res => {
          // console.log(res.books)
          this.setData({
            resultData: res.books
          });
          keyword.addToHistory(q);
        })
    },

    //监听搜索框有文字输入
    inputConfirm: function (event) {
      this.setData({
        inputValue: event.detail.value
      })
    },

    //book-detail事件
    onBookDetailTap: function (event) {
      const bid = event.detail.bid;
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      });
    }
  }
})