import jsCookies from 'js-cookie'
import CryptoJS from "crypto-js";
export const getToken = () => {
  // console.log(process.env);
  // if (process.env.NODE_ENV == 'development') {
  //   return 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3NyIsImlzcyI6ImNuLmNvbS53ZWJ0YXgud2Vic2l0ZSIsImlhdCI6MTU5NDE5ODQ2MiwiZXhwIjoxNjI1NzM0NDYyfQ.wJkBV4I_kYe_pjr1Yxbcji1dG4amfuAJooso7wfz_58'
  // } else {
  //   return localStorage.getItem('token');
  // }
  // return localStorage.getItem('token');
  return jsCookies.get('token')
};
export const getRegisterStatus = () => {
  return sessionStorage.getItem('registerStatus');
};
/**
 * aes对称加密
 * @param {string} key 加密的key
 * @param {sttring} word 需要加密的字符
 */
function getPrefixInteger(num, length) {
  return (num + Array(length).join("0")).slice(-length);
}
export const getEncrypted= (key,word) =>  {
  key = CryptoJS.enc.Utf8.parse(key.length<16?getPrefixInteger(key,16):key.substring(0, 16)); // 十六位十六进制数作为密钥

  let encrypted = CryptoJS.AES.encrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  // console.log("加密：", encrypted.toString());

  // let decrypt = CryptoJS.AES.decrypt(encrypted.toString(), key, {
  //   mode: CryptoJS.mode.ECB,
  //   padding: CryptoJS.pad.Pkcs7
  // });
  // let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  // console.log("解密：", decryptedStr.toString());
  return encrypted.toString();
}
/*!
 * 工具函数
 * 格式化日期
 */
export const formatTime = (date, format) => {
  if (!format) {
    format = '/';
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join(format) +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};
/**
 * 手机号验证
 * @param {string|number} str
 */
export const checkMobilePhone = str => {
  if (!(/^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/.test(str))) {
    return false;
  } else {
    return true;
  }
};
/**
 * 获取url ? 后面的参数
 */
export const getUrlParams = () => {
  let url = window.location.href;
  if (url.indexOf('?') !== -1) {
    let str = url.substr(url.indexOf('?') + 1);
    let strs = str.split('&');
    let result = {};
    for (let i = 0; i < strs.length; i++) {
      let key = strs[i].split('=')[0];
      let value = decodeURI(strs[i].split('=')[1]);
      if (i % 2 !== 0) {
        //对图片链接之类的参数值的解码
        value = decodeURIComponent(strs[i].split('=')[1]);
      } else {
        //对中文以及其他奇怪符号的参数值的解码
        value = decodeURI(strs[i].split('=')[1]);
      }
      result[key] = value;
    }
    return result;
  }
};
/**
 * 获取url后面确定key值的参数,不带#号
 * @param {string} name
 */
export const getQueryString = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); // 匹配目标参数
  let result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
  if (result != null) {
    return decodeURIComponent(result[2]);
  } else {
    return null;
  }
};

/**
 * 获取url后面确定key值的参数，带#号
 * @param {string} name
 */
export const getQueryStringHash = () => {
  let url = window.location.href;
  let result = {};
  if (url.indexOf('#') !== -1) {
    let str = url.substr(url.indexOf('#') + 1);
    let strs = str.split('?');
    for (let i = 0; i < strs.length; i++) {
      let key = strs[i].split('=')[0];
      let value = decodeURI(strs[i].split('=')[1]);
      if (i % 2 !== 0) {
        //对图片链接之类的参数值的解码
        value = decodeURIComponent(strs[i].split('=')[1]);
      } else {
        //对中文以及其他奇怪符号的参数值的解码
        value = decodeURI(strs[i].split('=')[1]);
      }
      result[key] = value;
    }
  }
  return result;
};
/**
 * 解析高级搜索内容,获取关键字
 * @param {JSON} jsonString
 */
export const getKeywords = (jsonString = {}) => {
  // 特殊处理文号类型关键词如 2018 65号
  let keywords = [],
    kw = [],
    kws = [];
  if (jsonString.queryString) {
    keywords = jsonString.queryString
      .split(' ')
      .filter(v => {
        return v && v.trim(); //去除空元素
      })
      .join()
      .split(',');
  }
  if (jsonString.advanceOptions && jsonString.advanceOptions.length > 0) {
    jsonString.advanceOptions.map(v => {
      kw.push(v.words);
    });
  }
  kws = kw.filter(v => {
    return v && v.trim();
  });
  keywords = [...new Set([...keywords, ...kws])];
  return keywords;
};
/**
 * 解析高级搜索内容,获取关键字
 * @param {JSON} jsonString
 */
export const getJsonKeywords = (jsonString = {}) => {
  let jsonStr = jsonString.queryString ? jsonString.queryString : '';
  // 特殊处理文号类型关键词如 2018 65号
  let karr = parseWritNo(jsonStr);
  let arr = karr.filter(v => {
    return v && v.trim();
  }); //去除空元素
  let keywords = [],
    kw = [],
    kws = [];
  if (jsonString.queryString) {
    keywords = jsonString.queryString
      .split(' ')
      .filter(v => {
        return v && v.trim(); //去除空元素
      })
      .join()
      .split(',');
  }
  if (jsonString.advanceOptions && jsonString.advanceOptions.length > 0) {
    jsonString.advanceOptions.map(v => {
      kw.push(v.words);
    });
  }
  kws = kw.filter(v => {
    return v && v.trim();
  });
  keywords =[...new Set([...keywords, ...kws,...arr])];
  // keywords = [...new Set([...keywords, ...kws])];
  return keywords;
};

// 汉字转为阿拉伯数字
let chnNumChar = {
  零: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9
};
let chnNameValue = {
  十: { value: 10, secUnit: false },
  百: { value: 100, secUnit: false },
  千: { value: 1000, secUnit: false },
  万: { value: 10000, secUnit: true },
  亿: { value: 100000000, secUnit: true }
};

export const ChineseToNumber = chnStr => {
  let rtn = 0;
  let section = 0;
  let number = 0;
  let secUnit = false;
  let str = chnStr.split('');

  for (let i = 0; i < str.length; i++) {
    let num = chnNumChar[str[i]];
    if (typeof num !== 'undefined') {
      number = num;
      if (i === str.length - 1) {
        section += number;
      }
    } else {
      let unit = chnNameValue[str[i]].value;
      secUnit = chnNameValue[str[i]].secUnit;
      if (secUnit) {
        section = (section + number) * unit;
        rtn += section;
        section = 0;
      } else {
        section += number * unit;
      }
      number = 0;
    }
  }
  return rtn + section;
};
/**
 * 拆解文号
 * @param {string} str
 */
export const parseWritNo = str => {
  str = str.replace(/\s+/g, '');
  let reg1 = /^(\D+)()第(\d+)号$/;
  let reg2 = /^(\D+)(\d{4})年第(\d+)号$/;
  let reg3 = /^(\D+)(\d{4})年(\d+)号$/;
  let reg4 = /^(\D+)\[(\d{4})\](\d+)号$/;
  let reg5 = /^(\D+)\[(\d{4})\]第(\d+)号$/;
  let reg6 = /^(.+?)()第(\d+)号令$/;
  let reg16 = /^(.+?)()(\d+)号令$/;
  let reg7 = /^(.*?)()第(\D+)号$/;
  let reg8 = /^(\D+)\〔(\d{4})\〕(\d+)号$/;
  let reg9 = /^(\D+)\〔(\d{4})\〕第(\d+)号$/;
  let reg10 = /^(\D+)\((\d{4})\)(\d+)号$/;
  let reg11 = /^(\D+)\（(\d{4})\）(\d+)号$/;
  let reg12 = /^(\D+)\［(\d{4})\］(\d+)号$/;
  let reg13 = /^(\D+)\{(\d{4})\}(\d+)号$/;
  let reg14 = /^(\D+)\｛(\d{4})\｝(\d+)号$/;
  let reg15 = /^(\D+)\【(\d{4})\】(\d+)号$/;
  let reg17 = /^(\D+)(\d{4})年第(\d+)号公告$/;

  let reg18 = /^(\D+)(\d{4})(.*?)(\d+号|\d+)(.*?)$/;
  let writNo = '';
  let writOrder = '';
  let year = '';
  let content = [];
  if (reg1.test(str)) {
    content = reg1.exec(str);
  }
  if (reg2.test(str)) {
    content = reg2.exec(str);
  }
  if (reg3.test(str)) {
    content = reg3.exec(str);
  }
  if (reg4.test(str)) {
    content = reg4.exec(str);
  }
  if (reg5.test(str)) {
    content = reg5.exec(str);
  }
  if (reg6.test(str)) {
    content = reg6.exec(str);
  }
  if (reg8.test(str)) {
    content = reg8.exec(str);
  }
  if (reg9.test(str)) {
    content = reg9.exec(str);
  }
  if (reg10.test(str)) {
    content = reg10.exec(str);
  }
  if (reg11.test(str)) {
    content = reg11.exec(str);
  }
  if (reg12.test(str)) {
    content = reg12.exec(str);
  }
  if (reg13.test(str)) {
    content = reg13.exec(str);
  }
  if (reg14.test(str)) {
    content = reg14.exec(str);
  }
  if (reg15.test(str)) {
    content = reg15.exec(str);
  }
  if (reg16.test(str)) {
    content = reg16.exec(str);
  }
  if (reg17.test(str)) {
    content = reg17.exec(str);
  }
  if (reg18.test(str)) {
    content = reg18.exec(str);
  }

  writOrder = content[3];
  // 特殊字符放在最后
  if (reg7.test(str)) {
    content = reg7.exec(str);
    writNo = content[1];
    writOrder = ChineseToNumber(content[3]);
  }
  // writNo = content[1];
  // year = content[2];
  // return {
  //   writNo,
  //   writOrder,
  //   year
  // };
  return content;
};

let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
let devInfo = {
  platform: isiOS ? 'ios' : 'android',
  appversion: '3.4.3',
  deviceToken: '',
  deviceNum: '',
  deviceModel: ''
}
export const setDeviceInfo = () => {
  return devInfo;
}

export const doLogin = (opt) => {
  let option = {
    path: opt.path || ''
  }
  return option
}
