import {
  HTTP
} from "../util/http";
class ClassicModel extends HTTP {
  /**
   * 获取最新一期期刊
   * @param {*} sCallBack
   */
  getLatest(sCallBack) {
    this.request({
      url: "classic/latest",
      method: "GET",
      success: res => {
        sCallBack(res);
        this._setLatestIndex(res.index);
        wx.setStorageSync(this._getKey(res.index), res);
      }
    });
  }

  /**
   * 获取前/后一期的期刊
   * @param {当前期刊的序号} index
   * @param {选择前一期/后一期} prevOrNext
   * @param {回调函数} sCallBack
   */
  getClassicPage(index, prevOrNext, sCallBack) {
    //先缓存后调用API
    let key =
      prevOrNext == "next" ? this._getKey(index + 1) : this._getKey(index - 1);
    console.log(key);
    let storagedClassicPage = wx.getStorageSync(key);
    if (!storagedClassicPage) {
      this.request({
        url: "/classic/" + index + "/" + prevOrNext,
        method: "GET",
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res);
          sCallBack(res);
        }
      });
    } else {
      sCallBack(storagedClassicPage);
    }
  }

  isFirst(index) {
    return index === 1 ? true : false;
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return index === latestIndex ? true : false;
  }

  _setLatestIndex(index) {
    wx.setStorageSync("latest", index);
  }

  _getLatestIndex() {
    let index = wx.getStorageSync("latest");
    return index;
  }

  /**
   * 获取存放入缓存中的key
   * @param {期刊号} index
   */
  _getKey(index) {
    let key = "classic-" + index;
    return key;
  }
}

export {
  ClassicModel
};