// pages/classic/classic.js
import { ClassicModel } from "../../models/classic";
import { LikeModel } from "../../models/like";
let classic = new ClassicModel();
let like = new LikeModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classic.getLatest(res => {
      this.setData({
        classicData: res
      });
    });
  },

  /**
   * Classic页面 - 点赞函数
   */
  onLike: function(event) {
    // console.log(event)
    let behaviour = event.detail.behaviour;
    let data = {
      art_id: this.data.classicData.id,
      type: this.data.classicData.type
    };
    like.postLike(behaviour, data, res => {
      console.log("点赞/取消点赞成功");
    });
  },

  /**
   * Classic页面 - navi事件监听函数
   */
  onNext: function() {
    let index = this.data.classicData.index;
    classic.getNext(index, res => {
      this.setData({
        classicData: res,
        latest: classic.isLatest(res.index),
        first: classic.isFirst(res.index)
      });
    });
  },

  onPrev: function() {
    let index = this.data.classicData.index;
    classic.getPrevious(index, res => {
      this.setData({
        classicData: res,
        latest: classic.isLatest(res.index),
        first: classic.isFirst(res.index)
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
