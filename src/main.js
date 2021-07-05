import "amfe-flexible";
import  store from "@/store";
import App from "./App.vue";
import router from "./router/router";
import importDirective from "@/directive";
import xss from 'xss'
import VConsole from 'vconsole'
import * as filters from './filters' // global filters
import "normalize.css";
import "./assets/iconfont/iconfont.css"; //引入阿里巴巴矢量图标库
import utils from "@/utils/utils2.js";
// import '@/utils/rem.js'
import * as config from "@/config/config.js";
import { get, post, del, put, upload } from "./axios";

import Validate from 'utils/form-validate'
Vue.prototype.formValidate = Validate
if (
  process.env.NODE_ENV === "development" 
  ||  process.env.VUE_APP_CURRENTMODE == "test"
) {
  new VConsole();
}
// new VConsole()
Array.prototype.push2 = function() {
  for (var i = 0; i < arguments.length; i++) {
    var ele = arguments[i];
    if (this.indexOf(ele) == -1) {
      this.push(ele);
    }
  }
};
Vue.prototype.$utils = utils;
importDirective(Vue);

Vue.prototype.$config = config;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$del = del;
Vue.prototype.$put = put;
Vue.prototype.$upload = upload;
Vue.config.productionTip = false;
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Object.defineProperty(Vue.prototype, '$xss', {
  value: xss
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
