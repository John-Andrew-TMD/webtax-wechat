import Vue from 'vue';
export let store = Vue.observable({ reloadTotal: false, reloadWelfare: false, reloadList: false,tableData:[],userInfo:{} });
export let mutations = {
  setUserInfo(userInfo){
    store.userInfo = userInfo;
  },
  setReloadTotal(flag){
    store.reloadTotal = flag;
  },
  // setReloadTotal(flag){
  //   store.reloadWelfare = flag;
  // },
  setReloadList(flag){
    store.reloadList = flag;
  },
  setTableData(flag){
    store.tableData = flag;
  }
}
