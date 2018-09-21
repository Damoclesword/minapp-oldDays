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
    inputValue: null
  },

  attached: function () {
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
    onCancel: function () {
      this.triggerEvent("search-cancel", {});
    },

    searchConfirm: function (event) {
      const q = event.detail.value;

      book.search(0, 0, q)
        .then(res => {
          console.log(res.books)
          this.setData({
            resultData: res.books
          });
          keyword.addToHistory(q);
        })
    }
  }
})