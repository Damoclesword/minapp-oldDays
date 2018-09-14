import {
  config
} from "../config";

const error_tips = {
  1: "抱歉，发生了错误",
  1000: "输入参数错误",
  1001: "输入的json格式不正确",
  1002: "找不到资源",
  1003: "未知错误",
  1004: "禁止访问",
  1005: "appkey无效，授权失败",
  1006: "服务器内部错误",
  1007: "URL请求错误"
};

//封装http类
class HTTP {
  request({
    url,
    data = {},
    method = "GET"
  }) {
    const promise = new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    });
    return promise;
  }

  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.api_base_url + url,
      data: data,
      method: method,
      header: {
        "content-type": "application/json",
        appkey: config.appkey
      },
      success: res => {
        //startsWidth必须是字符串格式!
        const code = res.statusCode.toString();
        if (code.startsWith("2")) {
          resolve(res.data);
        } else {
          reject();
          const error_code = res.data.error_code;
          this._show_errors(error_code);
        }
      },
      fail: err => {
        reject(err);
        this._show_errors(1);
      }
    });
  }

  _show_errors(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = error_tips[error_code];
    wx.showToast({
      title: tip ? tip : error_tips[1],
      icon: "none",
      duration: 2000
    });
  }
}

export {
  HTTP
};