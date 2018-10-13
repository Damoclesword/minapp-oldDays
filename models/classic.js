// import { HTTP } from "../util/http"
import { HTTP } from "../util/http-p"

class ClassicModel extends HTTP {
  //获取最新一期期刊
  getLatest() {
    return this.request({ url: `classic/latest` })
  }

  /**
   * 获取前/后一期的期刊
   * @param {当前期刊的序号} index
   * @param {选择前一期/后一期} prevOrNext
   */
  getClassicPage(index, prevOrNext) {
    //先缓存后调用API
    let key =
      prevOrNext == "next" ? this._getKey(index + 1) : this._getKey(index - 1)
    let storagedClassicPage = wx.getStorageSync(key)
    if (!storagedClassicPage) {
      return this.request({ url: `/classic/${index}/${prevOrNext}` })
    } else {
      return new Promise((resolve, reject) => {
        resolve(storagedClassicPage)
      })
    }
  }

  getFavClassicItems() {}

  //设置最新一期期刊缓存
  setLatestIndex(res) {
    wx.setStorageSync("latest", res.index)
    //直接给最新一期上缓存
    this.setClassicStorage(res)
  }

  //设置某一期刊缓存
  setClassicStorage(res) {
    wx.setStorageSync(this._getKey(res.index), res)
  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index === latestIndex ? true : false
  }

  _getLatestIndex() {
    let index = wx.getStorageSync("latest")
    return index
  }

  /**
   * 获取存放入缓存中的key
   * @param {期刊号} index
   */
  _getKey(index) {
    let key = "classic-" + index
    return key
  }
}

export { ClassicModel }
