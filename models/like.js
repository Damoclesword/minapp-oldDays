import { HTTP } from "../util/http";
class LikeModel extends HTTP {
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
}

export { LikeModel };
