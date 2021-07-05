//  wetchat.js  
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import wx from 'weixin-js-sdk'; // 引入wxJS
import apiUrl from '@/api/wxConfig'; // 本项目的api （根据自己项目）
import apiUrlQuestionnaire from '@/api/wxConfig/questionnaire'; // 本项目的api （根据自己项目）
// 二次分享：方案1
export const wxChatShare = param => {
  if(!param.data.url){
    param.data = {
      ...param.data,
      url:param.url,
    }
  }
  let fetchUrl = apiUrlQuestionnaire
  if(param.link.indexOf("/questionnaire") > -1){
    fetchUrl = apiUrlQuestionnaire
  }
  // let _url = encodeURIComponent(param.url); // 当前页面的url
  fetchUrl(param.data) // wechatConfig是获取微信配置相关信息的接口
    .then(res => {
      
      if (res.code == 200) {
        // 接口返回配置信息
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名
          jsApiList: [
            // 用的方法都要加进来
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'wx-open-launch-app'
          ]
        });
        wx.ready(function() {
          //分享到朋友圈
          wx.updateTimelineShareData({
            title: param.title, // 分享标题
            link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: param.imgUrl, // 分享图标
            success: function() {
              // 设置成功
              // console.log('分享到朋友圈成功返回的信息为:', res);
              // Toast('分享朋友圈');
            }
          });
          wx.onMenuShareTimeline({
            title: param.title, // 分享标题
            link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: param.imgUrl, // 分享图标
            success: function() {
              // 用户点击了分享后执行的回调函数
            }
          });
          //分享给朋友
          wx.updateAppMessageShareData({
            title: param.title, // 分享标题
            desc: param.desc, // 分享描述
            link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: param.imgUrl, // 分享图标
            success: function() {
              // 设置成功
              // console.log('分享到朋友圈成功返回的信息为:', res);
              // Toast('分享好友');
            }
          });
          wx.onMenuShareAppMessage({
            title: param.title, // 分享标题
            desc: param.desc, // 分享描述
            link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: param.imgUrl, // 分享图标
            type: param.type, // 分享类型,music、video或link，不填默认为link
            dataUrl: param.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 用户点击了分享后执行的回调函数
            }
          });
        });
        wx.error(function(res) {
          // console.log('验证失败返回的信息:', res);
        });
      } else {
        // Toast(res.message);
      }
    });
};

// 在需要分享转发的地方使用
// import * as wechatJS from '@/utils/wechat'; // 引入wechat.js
// //  写在方法中调用，或者在生命周期中调用 wechatJS.wxChatShare(_param)
// let _param = {
//   studentId: 1, // 个人项目而定
//   activityId: 1, // 个人项目而定
//   url: window.location.href, // 当前页面url
//   title: '文章详情', // 标题
//   desc: '法规文章详情', // 描述
//   link: 'http://192.168.1.184:8081//article/detail', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//   imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg', // 分享数据配置  －－ 全路径
//   type: 'link', // 分享类型,music、video或link，不填默认为link
//   dataUrl: ' ' // 如果type是music或video，则要提供数据链接，默认为空
// };

// 方案2：
// (Vue中路由使用hash模式，开发微信H5页面分享时在安卓上设置分享成功，但是ios的分享异常,)ios当前页面分享给好友，点击进来是正常，如果二次分享，则跳转到首页；使用vue router跳转到第二个页面后在分享时，分享设置失败；以上安卓分享都是正常
// 出现原因分析：
// jssdk是后端进行签署，前端校验，但是有时跨域，ios是分享以后会自动带上 from=singlemessage&isappinstalled=0 以及其他参数，分享朋友圈参数还不一样，貌似系统不一样参数也不一样，但是每次获取url并不能获取后面这些参数
// 解决办法：
// 可以使用改页面this.$router.push跳转，为window.location.href去跳转，而不使用路由跳转，这样可以使地址栏的地址与当前页的地址一样，可以分享成功（适合分享的页面不多的情况下，作为一个单单页运用，这样刷新页面跳转，把入口地址保存在本地，等需要获取签名的时候 取出来，注意：sessionStorage.setItem(‘href’,href); 只在刚进入单应用的时候保存！