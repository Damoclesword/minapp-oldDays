// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAuthorized: false,
    userInfo: {},
  },

  onShow: function() {
    this.hasUserAuthorized()
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
})
