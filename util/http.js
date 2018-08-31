import { config } from "../config";

const error_tips = {
  1: "抱歉，发生了错误",
  1000: "输入参数错误",
  1001: "输入的json格式不正确",
  1002: "找不到资源",
  1003: "未知错误",
  1004: "禁止访问",
  1005: "appkey无效，授权失败",
  1006: "服务器内部错误"
};

//封装http类
class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET";
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      method: params.method,
      header: {
        "content-type": "application/json",
        appkey: config.appkey
      },
      success: res => {
        //startsWidth必须是字符串格式!
        let code = res.statusCode.toString();
        if (code.startsWith("2") && params.success) {
          params.success(res.data);
        } else {
          let error_code = res.data.error_code;
          this._show_errors(error_code);
        }
      },
      fail: err => {
        this._show_errors(1);
      }
    });
  }

  _show_errors(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    wx.showToast({
      title: error_tips[error_code],
      icon: "none",
      duration: 2000
    });
  }
}

export { HTTP };
