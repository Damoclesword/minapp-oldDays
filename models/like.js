import { HTTP } from "../util/http-p"
class LikeModel extends HTTP {
  /**
   * 提交like
   * @param {like or cancel} behaviour
   * @param {当前页面的必要参数} params
   * @param {回调函数} sCallBack
   */
  postLike(behaviour, params) {
    let like_url = "/like"
    let cancel_url = "/like/cancel"
    return this.request({
      url: behaviour === "like" ? like_url : cancel_url,
      data: params,
      method: "POST",
    })
  }

  /**
   * 刷新本地页面cache中的like缓存
   * @param {page's index} index
   * @param {like or cancel} behaviour
   */
  refreshCache(index, behaviour) {
    let currentClassic = wx.getStorageSync("classic-" + index)
    if (currentClassic) {
      // console.log("该页面有缓存！");
      if (behaviour == "like") {
        currentClassic.like_status = 1
        currentClassic.fav_nums += 1
      } else {
        currentClassic.like_status = 0
        currentClassic.fav_nums -= 1
      }
      wx.setStorageSync("classic-" + index, currentClassic)
    }
  }
}

export { LikeModel }
