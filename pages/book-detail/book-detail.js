// pages/book-detail/book-detail.js
import {
  BookModel
} from "../../models/book";
import {
  LikeModel
} from "../../models/like";
const bookModel = new BookModel();
const like = new LikeModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    likeCount: 0
  },

  /**
   * book-detail - 点赞函数
   */
  onLike: function (event) {
    let behaviour = event.detail.behaviour;
    let data = {
      art_id: this.data.book.id,
      type: 400
    };
    like.postLike(behaviour, data, res => {
      console.log("点赞/取消点赞成功");
    });
  },

  /**
   * 短评点赞(接口原因，暂时未实现)
   */
  tagLikeTap: function (event) {
    console.log(event.detail);
  },

  /**
   * 提交评论
   */
  postComments: function (event) {
    this.triggerEvent('hidePostingTap');
  },

  /**
   * 弹出短评编辑框
   */
  showPostingTap: function (event) {
    this.c_model.showModel();
  },

  /**
   * 隐藏短评编辑框
   */
  hidePostingTap: function (e) {
    this.c_model.hideModel();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const like = bookModel.getLikeStatus(bid);

    detail.then(res => {
      this.setData({
        book: res
      });
    });

    comments.then(res => {
      this.setData({
        comments: res.comments
      });
    });

    like.then(res => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.c_model = this.selectComponent('#c-model');
  },

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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});