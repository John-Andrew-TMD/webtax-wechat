import {
  dateFormatBySeparator,
  timestampFormat,
  thousandSeparator,
  decimalsFormat
} from 'utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function filterNumberUnit(num, digits) {
  const si = [{
    value: 1E18,
    symbol: 'E'
  },
  {
    value: 1E15,
    symbol: 'P'
  },
  {
    value: 1E12,
    symbol: 'T'
  },
  {
    value: 1E9,
    symbol: 'G'
  },
  {
    value: 1E6,
    symbol: 'M'
  },
  {
    value: 1E3,
    symbol: 'k'
  }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 * @param {number} minDecimals 保留位数
 */
export function filterToThousand(num, minDecimals) {
  return thousandSeparator(num, minDecimals)
}

/**
 * Upper case first char
 * @param {String} string
 */
export function filterUppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
/**
 * 日期分割
 * @param {string} date 日期
 * @param {string} separator 分隔符
 */
export function filterDateSeparate(date, separator) {
  return dateFormatBySeparator(date, separator)
}

/**
 * 小数位位数处理
 * @param {string, number} num 待处理数字
 * @param {number} minDecimals 最小小数位数
 * @param {number} maxDecimals 最大小数位数
 * @param {string, number} defaultVal 默认返回值
 */
export function filterDigitDecimals(num, minDecimals, maxDecimals, defaultVal) {
  return decimalsFormat(num, minDecimals, maxDecimals, defaultVal)
}
/**
 * 通过功能号查找字典项值
 * @param {string} objKey 字典项key
 * @param {sttring} functionId 功能号
 */
export function filterDictValue(objKey, functionId) {
  return queryDictValue(functionId, objKey)
}
/**
 * 通过金钱数额
 * @param {string} money 金钱(单位)
 * @param {sttring} minDecimals 保留位数
 */
export function filterMoneyValue(num,minDecimals, maxDecimals, defaultVal) {
  return decimalsFormat(+num/100,minDecimals,maxDecimals,defaultVal)
}
export function filterIsWithdraw(isWithdraw,redpackType) {
  return isWithdraw?"红包提现":redpackType?"邀请红包":"答题红包"
}

/**
 * 通过userId查找userName
 * @param {string} userId
 */
export const filterUserInfo = userId => {
  return queryUserNameById(userId)
}
/**
 * 通过orgId查找orgName
 * @param {string} orgid
 */
export const filterOrgInfo = orgId => {
  return queryOrgNameById(orgId)
}

/**
 * 通过custId查找custName
 * @param {string} userId
 */
export const filterCustInfo = custId => {
  return queryCustNameById(custId)
}

export const filterTimestamp = (timestamp, format) => {
  return timestampFormat(timestamp, format)
}
export const filterCountOver = count => {
  // console.log("count",count)
  if(+count>=9999){
    return "9999+"
  }
  return count
}
export const  filterMoney=(num)=> {
  return (num / 100).toFixed(2);
}