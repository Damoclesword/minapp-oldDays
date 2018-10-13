// pages/classic/classic.js
import { ClassicModel } from "../../models/classic"
import { LikeModel } from "../../models/like"
let classic = new ClassicModel()
let like = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classic.getLatest().then(res => {
      this.setData({
        classicData: res,
      })
      classic.setLatestIndex(res)
    })
  },

  /**
   * Classic页面 - 点赞函数
   */
  onLike: function(event) {
    // console.log(event)
    let behaviour = event.detail.behaviour
    let data = {
      art_id: this.data.classicData.id,
      type: this.data.classicData.type,
    }
    like.postLike(behaviour, data, res => {
      let index = this.data.classicData.index
      //此处刷新本地缓存
      like.refreshCache(index, behaviour)
      console.log("点赞/取消点赞成功")
    })
  },

  /**
   * Classic页面 - navi事件监听函数
   */
  onNext: function() {
    let index = this.data.classicData.index
    classic.getClassicPage(index, "next").then(res => {
      this._setClassicData(res)
      classic.setClassicStorage(res)
    })
  },

  onPrev: function() {
    let index = this.data.classicData.index
    classic.getClassicPage(index, "previous").then(res => {
      this._setClassicData(res)
      classic.setClassicStorage(res)
    })
  },

  _setClassicData(res) {
    this.setData({
      classicData: res,
      latest: classic.isLatest(res.index),
      first: classic.isFirst(res.index),
    })
  },
})
