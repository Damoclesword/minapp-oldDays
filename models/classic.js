import { HTTP } from "../util/http";
class ClassicModel extends HTTP {
  getLatest(sCallBack) {
    this.request({
      url: "classic/latest",
      method: "GET",
      success: res => {
        sCallBack(res);
        this._setLatestIndex(res.index);
      }
    });
  }

  getPrevious(index, sCallBack) {
    this.request({
      url: "/classic/" + index + "/previous",
      method: "GET",
      success: res => {
        sCallBack(res);
      }
    });
  }

  getNext(index, sCallBack) {
    this.request({
      url: "/classic/" + index + "/next",
      method: "GET",
      success: res => {
        sCallBack(res);
      }
    });
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
}

export { ClassicModel };
