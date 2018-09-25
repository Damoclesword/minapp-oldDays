// pages/book/book.js
import {
  BookModel
} from '../../models/book';
import {
  randomString
} from '../../util/common';
const book = new BookModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookDatas: null,
    searching: false,
    more: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading = this.selectComponent("#c-loading");
    this.loading.showLoading();
    book.getHotList().then(res => {
      this.setData({
        bookDatas: res
      }, () => {
        this.loading.hideLoading();
      });
    });
  },

  /**
   * 监听book组件点击事件并跳转到book详情
   */
  onBookDetailTap: function (event) {
    const bid = event.detail.bid;
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bid=${bid}`,
    })
  },

  /**
   * 监听search框点击事件
   */
  onSearchTap: function (event) {
    this.setData({
      searching: true
    });
  },

  /**
   * 监听search框消失
   */
  onSearchCancel: function (event) {
    this.setData({
      searching: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const randomStr = randomString(false, 32);
    this.setData({
      more: randomStr
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});