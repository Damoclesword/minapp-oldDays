import { HTTP } from "../util/http";
class LikeModel extends HTTP {
  /**
   * 提交like
   * @param {like or cancel} behaviour
   * @param {当前页面的必要参数} params
   * @param {回调函数} sCallBack
   */
  postLike(behaviour, params, sCallBack) {
    let like_url = "/like";
    let cancel_url = "/like/cancel";
    this.request({
      url: behaviour === "like" ? like_url : cancel_url,
      data: params,
      method: "POST",
      success: res => {
        if (sCallBack) sCallBack(res);
      }
    });
  }

  /**
   * 刷新本地页面cache中的like缓存
   * @param {page's index} index 
   * @param {like or cancel} behaviour 
   */
  refreshCache(index, behaviour) {
    let currentClassic = wx.getStorageSync("classic-" + index);
    if (currentClassic) {
      console.log("该页面有缓存！");
      currentClassic.like_status = behaviour == "like" ? 1 : 0;
      wx.setStorageSync("classic-" + index, currentClassic);
    }
  }
}

export { LikeModel };
