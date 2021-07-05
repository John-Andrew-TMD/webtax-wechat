// import Vue from 'vue';
import Router from "vue-router";
Vue.use(Router);
const Error404 = resolve => require(["@/views/404.vue"], resolve);
import { routerMp } from "./router-mp"; // 投稿
import { routerPromote } from "./router-promote"; // 推广
import { routerTax } from "./router-tax"; // 推广
import { routerLive } from "./router-live"; // 推广
import { routerQuestionnaire } from "./router-questionnaire";
import jsCookies from "js-cookie";
let router = new Router({
  mode: "history",
  base: "/mp/",
  routes: [
    {
      path: "/",
      redirect: "/auth",
      component: () => import("@/views/index.vue"),
      meta: { title: "答税", isLogin: false, keepAlive: true }
    },
    {
      path: "/auth",
      name:"auth",
      component: () => import("@/views/index.vue"),
      meta: { title: "答税", isLogin: false, keepAlive: true }
    },
    {
      path: '/questionnairepc',
      name: 'questionnairepc',
      component: () => import('@/views/questionnairepc/index'),
      meta: { title: '财税知识网络竞赛'}
    },
    {
      path: '/questionnairepc/list',
      name: 'questionnairepcList',
      component: () => import('@/views/questionnairepc/list'),
      meta: { title: '财税知识网络竞赛' }
    },
    // 文章相关路由
    ...routerMp,
    ...routerPromote,
    ...routerTax,
    ...routerQuestionnaire,
    ...routerLive,
    // 下载
    {
      path: "/download",
      name: "download",
      component: () => import("@/views/guide/Guide.vue"),
      meta: { title: "答税", isLogin: false, keepAlive: true }
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test/index.vue"),
      meta: { title: "测试", isLogin: true, keepAlive: true }
    },
    {
      path: "/nofound",
      name: "noFound",
      component: () => import("@/views/noFound.vue"),
      meta: { title: "资源不存在", isLogin: false, keepAlive: true }
    },
    {
      path: "*",
      name: "error404",
      meta: {
        title: "页面不存在",
        isLogin: false,
        keepAlive: false
      },
      component: Error404
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('from', from);
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.isLogin) {
    // console.log("to",to.path,(to.path.indexOf("questionnaire")));
    if (to.path.indexOf("liveList") > -1||to.path.indexOf("liveDetail") > -1||to.path.indexOf("resultPay") > -1) {
      if(!jsCookies.get("userinfo")){
        next("/auth?path=" + to.fullPath);
      }
    }
   
    if (to.path.indexOf("questionnaire") > -1) {
      if (!jsCookies.get("token")) {
        if (to.path != "/questionnaire/mng") {
          next({
            path: "/questionnaire/mng",
            query: {
              inviteUserId: to.query.inviteUserId,
              examId: to.query.examId
            }
          });
          return false;
        } else {
          next();
        }
      } else {
        next();
      }
    } else {
      if (!jsCookies.get("token")) {
        if (to.path != "/auth") {
          next("/auth?path=" + to.fullPath);
          return false;
        } else {
          next();
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }  
});
export default router;
