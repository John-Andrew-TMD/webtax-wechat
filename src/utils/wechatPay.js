//  wetchat.js
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import wx from "weixin-js-sdk"; // 引入wxJS
import { orderPay } from "@/api/liveList";
import router from "@/router/router";
import * as config from "@/config/config.js";
// 微信支付
export const wxChatPay = param => {
  if (!param.data.url) {
    param.data = {
      ...param.data,
      url: param.url
    };
  }

  // let _url = encodeURIComponent(param.url); // 当前页面的url
  orderPay(param.data) // wechatConfig是获取微信配置相关信息的接口
    .then(res => {
      if (res.code == 200) {
        // 接口返回配置信息
        let data = res.data.wxMpPay;
        let prepay_id = data.packageValue;
        function onBridgeReady() {
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              appId: data.appId,
              timeStamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign // 支付签名
            },
            function(res) {
              
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                window.location.href = `http://${window.location.host}/mp/liveDetail?id=${param.id}`;
              }
            }
          );
        }
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener(
              "WeixinJSBridgeReady",
              onBridgeReady,
              false
            );
          } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
            document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
          }
        } else {
          onBridgeReady();
        }

        // let stringA=`appid=${data.appId}&nonce_str=${data.nonceStr}&package=${data.packageValue}&signType=${data.signType}&timeStamp=${data.timeStamp}`;
        // let stringSignTemp=stringA+"&key=P6bbv8zwKL6bC7otQImcZdoJltE15md9"
        // let sign=md5(stringSignTemp).toUpperCase()
        // wx.config({
        //   debug: false,
        //   appId: data.appId,
        //   timeStamp: data.timeStamp, // 必填，生成签名的时间戳
        //   nonceStr: data.nonceStr, // 必填，生成签名的随机串
        //   signature: data.paySign, // 必填，签名
        //   jsApiList: ["chooseWXPay"]
        // });
        // wx.ready(() => {
        //   wx.checkJsApi({
        //     jsApiList: ["chooseWXPay"],
        //     success: function(res) {
        //       // console.log("seccess")
        //     },
        //     fail: function(res) {
        //       // console.log("fail");
        //     }
        //   });
        //   wx.chooseWXPay({
        //     appId: data.appId,
        //     timeStamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        //     nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        //     package: prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        //     signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        //     paySign: data.paySign, // 支付签名
        //     success: function(res) {
        //       // 支付成功后的回调函数
        //       // alert(res.errorMsg) abcdefghijklmnopqrst
        //       // this.$router.push('/user');
        //       // that.order[0].goods.host_url
        //       Toast("支付成功");
        //       // window.location.href = wxurl // 刷新页面
        //     },
        //     fail: function(res) {
        //       // alert("支付失败");
        //       // alert(res.errMsg);
        //       // this.$router.back()
        //       Toast("支付失败");
        //       window.history.go(-1);
        //     }
        //   });
        // });
        // wx.error(function(res) {
        //   // console.log('验证失败返回的信息:', res);
        // });
      } else {
        // Toast(res.message);
      }
    });
  wx.error(err => {
    // alert(err)
    Toast("支付失败");
    setTimeout(() => {
      window.history.go(-1);
    }, 500);
  });
};
