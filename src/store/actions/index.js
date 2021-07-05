// actions fn
import { authLogin, authBind, userInfo } from "@/api/user";
import { filterlist } from "@/api/liveList";
import { filterTree } from "utils";
const actions = {
  loginInByCode({ commit }, value) {},
  bindUser({ commit }, value) {
    return new Promise((resolve, reject) => {
      authBind(value).then(res => {
        commit("setToken", data.token);
        resolve();
      });
    }).catch(err => {
      reject(err);
    });
  },
  LoginByUserName({ commit }, { username, password }) {
    username = username.trim();
    password = password.trim();
    return new Promise((resolve, reject) => {
      this.$post("/api/auth/login", { username, password }).then(res => {
        let data = res.data.data;
        commit("setToken", data.token);
        resolve();
      });
    }).catch(err => {
      reject(err);
    });
  },
  LoginOut({ commit }) {
    return new Promise((resolve, reject) => {
      this.$post("api/auth/logout").then(res => {
        commit("setToken", null);
        resolve();
      });
    }).catch(err => {
      reject(err);
    });
  },
  getUerInfo({ state, commit }) {
    return new Promise((resolve, reject) => {
      commonApi.getUesrInfo().then(res => {
        if (res.success) {
          resolve(res.data);
          commit("setUserInfo", res.data);
        } else {
          resolve(null);
          commit("setUserInfo", null);
        }
      });
    });
  },
  getFilterlist({ commit, state, rootState }) {
    filterlist({
      filterTypeList: ["all"]
      // searchId: rootState.app.searchId
    }).then(res => {
      // console.log(state.listParams.condition.searchScope)
      setChecked(res.data, state.listParams.condition);
      res.data = {
        ...res.data,
        sort: [
          {
            label: "发布时间",
            value: "time"
          },
          {
            label: "按匹配度",
            value: "correlation_degree"
          }
        ]
      };
      let filterData = {
        livePlaybackTypes: res.data.livePlaybackTypes,
        taxTags: res.data.taxTags,
        livePlaybackTeachers: res.data.livePlaybackTeachers,
      };

      commit("SET_FILTYERDATA", filterData);
    });
  }
};
function setChecked(data, searchScope) {
  for (let key in data) {
    if (["taxTags"].includes(key)) {
      data[key] = data[key].map((item, index) => {
        if (searchScope[key]) {
          if (searchScope[key].includes(item.code)) {
            return { ...item, checked: true };
          }
        }
        return { ...item, checked: false };
      });
    }
  }
  return data;
}
export default actions;
