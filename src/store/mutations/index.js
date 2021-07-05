// mutations fn
import Vue from 'vue';
const mutations = {
  SET_SEARCHID(state,searchId){
    state.searchId = searchId
  },
  setToken(state, value) {
    state.token = value;
    localStorage.setItem("token", state.token);
  },
  setExamId(state, value) {
    state.examId = value;
  },
  setSeconds(state, seconds) {
    state.seconds = seconds;
  },
  setSecondsmins(state) {
    state.seconds -= 1;
  },
  setMinutes(state) {
    state.minutes -= 1;
    state.seconds = 59;
  },
  setUserInfo(state, value) {
    if (value) {
      state.userInfo = value;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    } else {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    }
  },
  setShowLogin(state, value) {
    state.showLogin = value;
  },
  setShowLoad(state, value) {
    state.showLoad = value;
  },
  setSkeleton(state, value) {
    state.skeleton = value;
  },
  setRegisterStatus(state, value) {
    state.registerStatus = value;
    localStorage.setItem("registerStatus", state.registerStatus);
  },
  changeCity(state, city) {
    state.city = city;
    try {
      localStorage.city = city;
    } catch (e) {}
  },
  setDeepColor(state, value) {
    state.isDeepColor = value;
    try {
      localStorage.isDeepColor = value;
    } catch (e) {}
  },
  SET_LISTKEYWORD(state, searchCondition) {
    state.listParams.condition.searchCondition = searchCondition;
  },
  SET_LISTKEYWORDCON(state, condition) {
    console.log(condition,"SET_LISTKEYWORDCON")
    state.listParams.condition = condition;
  },
  SET_LISTPARAMS(state, listParams) {
    // console.log("SET_LISTPARAMS")
    state.listParams = listParams;
  },
  SET_LISTRESULT(state, total) {
    state.listResult.total = total;
    Vue.set(state, 'listResult', { ...state.listParams, total: total });
  },
  SET_LISTPARAMSCOPE(state, searchScope) {
    let stateSearchScope = state.listParams.condition;
    stateSearchScope = Object.assign(stateSearchScope, searchScope);
    state.listParams.condition = stateSearchScope;
    Vue.set(state, 'listParams', { ...state.listParams });
  },
  SET_PAGENOADD(state) {
    // console.log("SET_PAGENOADD")
    state.listParams.pageNo++;
  },
  RESET_PAGENOADD(state) {
    // console.log("RESET_PAGENOADD")
    state.listParams.pageNo = 1;
  },
  RESET_LISTPARAMS(state) {
    // console.log("RESET_LISTPARAMS")
    state.listParams = {
      condition: {
        searchCondition: '',
        searchScope: {},
        orderField: ['correlation_degree'],
      },
      pageNo: 1,
      pageSize: 10,
    };
  },
  SET_FILTYERDATA(state, filterData) {
    state.filterData = filterData;
    Vue.set(state, 'filterData', { ...state.filterData });
  },
};
export default mutations;
