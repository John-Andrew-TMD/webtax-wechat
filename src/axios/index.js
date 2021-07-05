import Axios from "axios";
import {API_CONFIG_URL} from "@/config/config";
import {getToken, getUrlParams} from "../utils/util";
import router from "@/router/router";
import jsCookies from "js-cookie";
import {wxConfig} from "@/utils/wxConfig";

const Service = Axios.create({
  baseURL: API_CONFIG_URL,
  responseType: "json",
  timeout: 30000 // 请求超时时间
});
Service.interceptors.request.use(
  config => {
    config.headers.platform = "wechat"
    if (config.url != "/auth/login") {
      config.headers.token = getToken(); //纯H5方式
    }
    if (config.url.includes('/pay/wxpay')) {
      config.headers.platform = 'wechat'
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
// 响应拦截
Service.interceptors.response.use(
  // 成功回调
  response => {
    let res = response.data;
    if (res.success) {
      return Promise.resolve(res);
    } else {
      if (res.code === 201 || res.code === 202) {
        jsCookies.remove("token");
        jsCookies.remove("userinfo");
        if (window.location.href.indexOf("/questionnaire") > -1) {
          let route = getUrlParams();
          if (!jsCookies.get("token")) {
            // alert(JSON.stringify(location))
            window.location.href =
              "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
              wxConfig.appid +
              "&redirect_uri=" +
              encodeURIComponent(funcUrlDel("code")) +
              "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
          } else {
            router.push({
              path: "/questionnaire/mng",
              query: {
                inviteUserId: route.inviteUserId,
                examId: route.examId
              }
            });
          }
        } else {
          router.push("/auth");
        }
      } else {
        return Promise.resolve(res);
      }
    }
  },
  // 错误回调
  error => {
    if (error.response) {
      // http状态码错误
      switch (error.response.status) {
        case 401:
          console.log(401);
          break;
        case 403:
          console.log(403);
          break;
        case 404:
          console.log(404);
          break;
        case 500:
          console.log(500);
          break;
      }
    }
    vant.Toast.fail({message: "服务开了个小差，请稍后再试"});
    return Promise.reject(error.response);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    Service.get(url, {params: params})
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      })
      .finally(function () {
        console.log("finally");
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    Service.post(url, data)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      })
      .finally(function () {
        console.log("finally");
      });
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    Service.patch(url, data)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      })
      .finally(function () {
        console.log("finally");
      });
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    Service.put(url, data)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      })
      .finally(function () {
        console.log("finally");
      });
  });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function del(url, data = {}) {
  return new Promise((resolve, reject) => {
    Service.delete(url, data)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      })
      .finally(function () {
        console.log("finally");
      });
  });
}

/**
 * 上传文件的方法
 * @param url
 * @param data
 * @returns {Promise}
 */
function upload(url, data = {}) {
  return new Promise((resolve, reject) => {
    Service.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      })
      .finally(function () {
        console.log("finally");
      });
  });
}

function funcUrlDel(name) {
  var loca = window.location;
  var baseUrl = loca.origin + loca.pathname + "?";
  var query = loca.search.substr(1);
  if (query.indexOf(name) > -1) {
    var obj = {};
    var arr = query.split("&");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    var url =
      baseUrl +
      JSON.stringify(obj)
        .replace(/[\"\{\}]/g, "")
        .replace(/\:/g, "=")
        .replace(/\,/g, "&");
    return url;
  } else {
    // 临时解决：避免出现授权时出现 URl = undefined
    return loca.origin + loca.pathname;
  }
}

export {Service, get, post, patch, put, del, upload};
