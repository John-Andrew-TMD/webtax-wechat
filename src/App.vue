<template>
  <div v-cloak id="app" class="app">
    <keep-alive >
      <router-view
        v-if="$route.meta.keepAlive && isRouterAlive"
        v-show="!showLogin"
        :key="$route.fullPath"
      />
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive && isRouterAlive"
      :key="$route.fullPath"
      v-show="!showLogin"
    />
    <loading v-show="showLoad" class="loadding-icon"></loading>
  </div>
  
</template>
<style lang="scss">
/* // commom  css */
// @import "./assets/css/animate.scss";
@import "./assets/css/common.scss";
[v-clock] {
  display: none;
}
.app {
  height: 100%;
}
</style>
<script>
// import { Loading } from "@/components/loading";
import Loading from "@/components/skeleton/pageLoading.vue";
import { authLogin, authBind, getUserInfo } from "@/api/user";
import jsCookies from "js-cookie";
export default {
  name: "app",
  components: { Loading },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  computed: {
    userInfo() {
      return JSON.parse(jsCookies.get("userinfo")) || null;
    },
    showLoad() {
      return this.$store.state.showLoad;
    },
    showSkeleton() {
      return this.$store.state.skeleton;
    }
  },
  watch: {
    $route: function(v) {
    }
  },
  created() {},
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },
  beforeDestroy() {}
};
</script>
