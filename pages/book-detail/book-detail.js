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
    likeCount: 0,
    posting: false,
    animationModel: {},
    animationBg: {}
  },

  /**
   * Book-detail - 点赞函数
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
   * 弹出短评编辑框
   */
  showPostingTap: function (event) {
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
    this.setData({
      posting: true,
    });
    this.animation = animation;
    this.animationBg = animationBg;
    setTimeout(function () {
      that.fadeIn();
    }, 200);
  },

  /**
   * 对应隐藏短评编辑框
   */
  hidePostingTap: function (e) {
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
    that.fadeOut();
    setTimeout(function () {
      that.setData({
        posting: false,
      });
    }, 300);
  },

  /**
   * 淡入动画
   */
  fadeIn: function () {
    this.animation.translateY(0).step();
    this.animationBg.opacity(0.5).step();    
    this.setData({
      animationModel: this.animation.export(),
      animationBg: this.animationBg.export()
    });
  },

  /**
   * 淡出动画
   */
  fadeOut: function () {
    this.animation.translateY("100%").step();
    this.animationBg.opacity(0).step();
    this.setData({
      animationModel: this.animation.export(),
      animationBg: this.animationBg.export()
    });
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});