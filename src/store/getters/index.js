// getters fn
const getters = {
  searchId: state => state.searchId,
  listParams: state => state.listParams,
  listResult: state => state.listResult,
  filterData: state => state.filterData,
  getAnnexMoney: state => {
    return state.annexMoney || 0.00
  },
  getAnnexMoneyForYear: state => {
    return state.annexMoneyForYear || 0.00
  },
  getTotalAnnexMoney: state => {
    return state.totalAnnexMoney || 0.00
  },
  // 累计各月统计
  getTotal(state) {
    return state.totalRevenue ? JSON.parse(state.totalRevenue) : null;
  },
  // 五险一金个月统计
  getWelfare(state) {
    return state.welfare? JSON.parse(state.welfare) : null;
  },
  getUserInfo: state => {
    return state.userInfo
  },
  getColorModel: state => {
    return state.isDeepColor
  },
  examId: state => {
    return state.examId
  },
  minutes: state => {
    return state.minutes
  },
  seconds: state => {
    return state.seconds
  },
};
export default getters;
