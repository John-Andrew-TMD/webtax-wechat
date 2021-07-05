import router from '@/router/router';
// import moment from 'moment';
import { HREF_CONFIG_URL } from '@/config/config';

// -------------------工具类方法-------------------
// 是否为微信浏览器
const isWeChat = () => {
  let ua = navigator.userAgent.toLowerCase();
  let isWeixin = ua.indexOf('micromessenger') != -1;
  if (isWeixin) {
    return true;
  } else {
    return false;
  }
}
// 是否为QQ浏览器
const isQQ = () => {
  let ua = navigator.userAgent.toLowerCase();
  // let isQQ = ua.indexOf('qq') != -1;
  let isQQ = ua.indexOf(' qq') != -1 && ua.indexOf('mqqbrowser') != -1;
  if (isQQ) {
    return true;
  } else {
    return false;
  }
}
// 是否为IOS机型
const isIos = () => {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isAndroid) {
    // return 'Android';
    return false;
  } else {
    // return 'IOS';
    return true;
  }
}
// 是否是腾讯浏览器: 微信浏览器, QQ内置浏览器 isQQ  isWechat结合
const isTxBrowser = () => {
  return (
    navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1 ||
    (navigator.userAgent.toLowerCase().indexOf(' qq') != -1 &&
      navigator.userAgent.toLowerCase().indexOf('mqqbrowser') != -1)
  );
}
// 是否为手机打开
const isMoible = () => {
  let UA = navigator.userAgent;
  return /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA)
    ? true
    : false;
}
// 去除两边空格
const trim = s => {
  // 去左右空格;
  return s.replace(/(^\s*)|(\s*$)/g, '');
}
// 是否为空
const isEmpty = (obj) => {
  if (typeof obj == 'undefined' || obj == null || obj == '') {
    return true;
  } else {
    return false;
  }
}
const dateUtils = {
  /**
   * 将日期字符串转换为Date
   * @param dateStr 时间字符串
   * @param dateFormat 时间格式：
   * <ol>
   * <li>YYYY-MM-dd HH:mm:ss</li>
   * <li>YYYY/MM/dd HH:mm:ss</li>
   * <li>YYYY.MM.dd HH:mm:ss</li>
   * <li>YYYY年MM月dd日 HH时mm分ss秒</li>
   * <li>YYYY-MM-dd</li>
   * <li>YYYY/MM/dd</li>
   * <li>YYYY.MM.dd</li>
   * <li>HH:mm:ss</li>
   * <li>HH时mm分ss秒</li>
   * <li>YYYY-MM-dd HH:mm</li>
   * <li>YYYYMMddHHmmss</li>
   * <li>YYYYMMdd</li>
   * </ol>
   * @returns {moment.Moment}
   */
  parse(dateStr, dateFormat) {
    return moment(dateStr, dateFormat);
  },
  /**
   * 根据特定格式格式化日期
   * @param date 被格式化的日期
   * @param format 时间格式：
   * <ol>
   * <li>YYYY-MM-dd HH:mm:ss</li>
   * <li>YYYY/MM/dd HH:mm:ss</li>
   * <li>YYYY.MM.dd HH:mm:ss</li>
   * <li>YYYY年MM月dd日 HH时mm分ss秒</li>
   * <li>YYYY-MM-dd</li>
   * <li>YYYY/MM/dd</li>
   * <li>YYYY.MM.dd</li>
   * <li>HH:mm:ss</li>
   * <li>HH时mm分ss秒</li>
   * <li>YYYY-MM-dd HH:mm</li>
   * <li>YYYYMMddHHmmss</li>
   * <li>YYYYMMdd</li>
   * </ol>
   * @returns {string}
   */
  format: (date, format) => {
    return moment(date).format(format);
  },
  /**
   * 获取年份
   */
  getYear() {
    return new Date().getFullYear()
  },
  /**
 * 获取当前月份
 * @param {Boolean} fillFlag 布尔值,是否补 0,默认为 true
 */
  getMonth(fillFlag=true) {
    const mon = new Date().getMonth() + 1
    const monRe = mon
    if (fillFlag) mon < 10 ? `0${mon}` : mon
    return monRe
  },
  /**
   * 获取日
   * @param {Boolean} fillFlag 布尔值,是否补 0
   */
  getDay(fillFlag=true) {
    const day = new Date().getDate()
    const dayRe = day
    if (fillFlag) day < 10 ? `0${day}` : day
    return dayRe
  },
  // 获取星期几
  getWhatDay() {
    return new Date().getDay() ? new Date().getDay() : 7
  },
  /**
   * 获取当前月天数
   * @param {String} year 年份
   * @param {String} month 月份
   */
  getMonthNum(year, month) {
    let d = new Date(year, month, 0)
    return d.getDate()
  }
}

// 检查函数方法
const checkFn = {
  /**
   * 判断是否是邮箱地址
   * @param {String} data
   */
  checkEmail(data) {
    const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
    if (reg.test(data)) return true
  },
  /**
   * 判断是否是手机号，只要是13,14,15,16,17,18,19开头即可
   * @param {String} data
   */
  checkTelphone(data) {
    const reg = /^((\+|00)86)?1[3-9]\d{9}$/g
    if (reg.test(data)) return true
  }
}

// -------------------业务类方法处理-------------------------
// 返回上一页
const returnPage = () => {
  router.go(-1);
}
// 失去焦点
const onblur = () => {
  window.scrollTo(0, 0);
}
// 是否展示自定义头部标题：针对微信端
const showTitle = () => {
  let ua = navigator.userAgent.toLowerCase();
  let isWeixin = ua.indexOf('micromessenger') != -1;
  if (isWeixin) {
    return false;
  } else {
    return true;
  }
}
const toTop = () => {
  let distance =
    document.documentElement.scrollTop || document.body.scrollTop; // 获得当前高度
  let step = distance / 50; // 每步的距离
  (function jump() {
    if (distance > 0) {
      distance -= step;
      // document.documentElement.scrollTop = distance;
      // document.body.scrollTop = distance;
      window.scrollTo(0, distance);
      setTimeout(jump, 10);
    }
  })();
}
const scrollTo = distance => {
  window.scrollTo({
    top: distance - 100,
    behavior: 'smooth'
  });
}
/**
 * 获取H5当前访问根目录
 * @returns {*}
 */
const getH5BaseUrl = () => {
  return HREF_CONFIG_URL;
}
/**
 * 获取分享参数
 * @param route 路由
 * @param shareTitle 分享标题
 * @param shareSubtitle 分享副标题
 * @param others 分享其他参数
 * <ol>
 *     <li>others.monthlyId - 月刊ID</li>
 * </ol>
 * @returns {{shareTitle: string, sharePath: string, shareSubtitle: string, others: {monthlyId: string}}}
 */
const shareUrl = (route, shareTitle, shareSubtitle, others) => {
  let sharePath = ''
  if (route.meta && route.meta.sharePath && route.meta.sharePath !== '') {
    let params = ''
    if (Object.keys(route.params).length > 0) {
      for (let key in route.params) {
        params += '/' + route.params[key];
      }
    }
    if (params !== '') {
      sharePath += params;
    }
    let query = '';
    if (Object.keys(route.query).length > 0) {
      query = '?';
      let num = 0;
      for (let key in route.query) {
        num++;
        if (num > 1) {
          query += '&' + key + '=' + route.query[key];
        } else {
          query += key + '=' + route.query[key];
        }
      }
    }
    if (query !== '') {
      sharePath += query;
    }
    if (route.hash) {
      sharePath += route.hash;
    }
    sharePath = route.meta.sharePath + sharePath;
  }

  others = others === undefined ? {} : others;
  let shareBean = {
    // 分享路径
    sharePath: isEmpty(sharePath) ? '' : sharePath,
    // 分享标题
    shareTitle: isEmpty(shareTitle) ? '' : shareTitle,
    // 分享副标题
    shareSubtitle: isEmpty(shareSubtitle) ? '' : shareSubtitle,
    // 分享其余参数（注意：结构保持不变）
    others: {
      monthlyId: isEmpty(others.monthlyId) ? '' : String(others.monthlyId)
    }
  };
  return shareBean;
}
/**
 * 传递App_WebViewTitle
 * @param title 标题
 */
const setWebViewTitle = (title) => {
  // console.log(title);
  let settitle = title ? title : document.title
  document.title = settitle
  return settitle
}
const setPage = (page) => {
  // page：1：首页， 2：列表：3：详情
  return page
}

export default {
  dateUtils,
  checkFn,
  isEmpty,
  trim,
  isTxBrowser,
  isIos,
  isQQ,
  isWeChat,
  isMoible,
  returnPage,
  onblur,
  showTitle,
  toTop,
  scrollTo,
  getH5BaseUrl,
  shareUrl,
  setWebViewTitle,
  setPage
}

