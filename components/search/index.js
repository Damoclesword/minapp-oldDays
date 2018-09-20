// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword'
const keyword = new KeywordModel();
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
      keyword.addToHistory(event.detail.value);
    }
  }
})