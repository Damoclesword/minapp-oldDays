import { HTTP } from "../util/http";
class ClassicModel extends HTTP {
  getLatest(sCallBack) {
    this.request({
      url: "classic/latest",
      method: "GET",
      success: res => {
        sCallBack(res);
      }
    });
  }
}

export { ClassicModel };
