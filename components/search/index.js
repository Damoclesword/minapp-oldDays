// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword'
import {
  BookModel
} from "../../models/book"
import {
  paginationBeh
} from "../behaviors/pagination.js"
const keyword = new KeywordModel();
const book = new BookModel();
Component({
  /**
   * 导入behavior组件
   */
  behaviors: [paginationBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: function (newVal, oldVal) {
        if (!this.data.inputValue)
          return;

        if (!this._isLocked()) {
          if (!this.hasMoreData()) {
            return;
          }
          this._setLock();
          book.search(this.getCurrentStart(),
              0, this.data.inputValue)
            .then(res => {
              this.setMoreData(res.books);
              this._setUnlock();
            }, error => {
              this._setUnlock();
            });
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    histories: [],
    hot: [],
    inputValue: "",
    searched: false, //是否打开搜索面板
    loading: false //锁，用于防止无限加载多次请求 节流
  },

  attached: function () {
    //attached中加载历史搜索和热搜
    this._refreshHistory();
    keyword.getHot()
      .then(res => {
        this.setData({
          hot: res.hot
        })
      });
  },

  ready: function () {

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
      });
      this._clearSearchResult();
      this._closeSearchResult();
    },

    //确认搜索
    searchConfirm: function (event) {
      this._clearSearchResult();
      this._showSearchResult();
      const q = event.detail.value || event.detail.text; //从输入框或者点击获取搜索内容
      this.setData({
        inputValue: q
      });
      book.search(0, 0, q)
        .then(res => {
          //关闭loading动画
          this.loading.hideLoading();

          this.setTotal(res.total);
          this.setMoreData(res.books);
          keyword.addToHistory(q);
        })
    },

    //监听搜索框有文字输入
    inputConfirm: function (event) {
      this.setData({
        inputValue: event.detail.value
      }, () => {
        if (!this.data.inputValue) {
          this._closeSearchResult()
        }
      })
    },

    //book-detail事件
    onBookDetailTap: function (event) {
      const bid = event.detail.bid;
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      });
    },

    _showSearchResult: function () {
      this.setData({
        searched: true
      }, () => {
        //selectComponent必须在wx:if="true"后调用
        this.loading = this.selectComponent("#c-loading")
        this.loading.showLoading()
      })
    },

    _closeSearchResult: function () {
      //在搜索结果关闭后先刷新一次历史搜索记录
      this._refreshHistory()
      this.setData({
        searched: false
      })
    },

    //清空搜索数据
    _clearSearchResult: function () {
      this.setData({
        resultData: [],
        noneResult: false //包括重置noneResult标志
      })
    },

    //判断是否上锁
    _isLocked: function () {
      return this.data.loading;
    },

    _setLock: function () {
      this.setData({
        loading: true
      })
    },

    _setUnlock: function () {
      this.setData({
        loading: false
      })
    },

    //刷新历史搜索
    _refreshHistory: function () {
      let histories = keyword.getHistory();
      this.setData({
        histories
      });
    }
  }
})