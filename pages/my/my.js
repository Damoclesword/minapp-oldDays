import { BookModel } from "../../models/book"
import { ClassicModel } from "../../models/classic"
const bookModel = new BookModel()
const classic = new ClassicModel()

Page({
  data: {
    isAuthorized: false,
    userInfo: {},
    favBookCount: 0,
    favClassicData: {},
  },

  //此处不用onLoad是为了在收藏某书后该页面能实时更新收藏数据
  onShow: function() {
    this.hasUserAuthorized()
    this._getFavorBookCount()
    this._getFavorClassicItems()
  },

  //判断是否授权并自动更新信息
  hasUserAuthorized: function() {
    wx.getSetting({
      success: data => {
        if (data.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: res => {
              this._setUserInfo(true, res.userInfo)
            },
          })
        } else {
          this._setUserInfo(false)
        }
      },
    })
  },

  //用户第一次手动触发获取信息
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this._setUserInfo(true, userInfo)
    }
  },

  //设置用户是否授权与用户信息
  _setUserInfo(isAuthorized = false, userInfo = {}) {
    this.setData({
      isAuthorized,
      userInfo,
    })
  },

  //获取喜欢书籍数量
  _getFavorBookCount() {
    bookModel.getFavorBookCount().then(res => {
      this.setData({
        favBookCount: res.count,
      })
    })
  },

  //获取用户收藏期刊信息
  _getFavorClassicItems() {
    classic.getFavorClassicItems().then(res => {
      this.setData({
        favClassicData: res,
      })
      console.log(res)
    })
  },
})
