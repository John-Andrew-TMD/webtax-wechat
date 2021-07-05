<template>
  <div>
    <loading v-show="showLoad" class="loadding-icon"></loading>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import { authLogin, getUserInfo } from '@/api/user';
import { wxConfig } from '@/utils/wxConfig'
import {Loading, skeletonList } from '@/components/loading';
import jsCookies from 'js-cookie'
import { getEncrypted } from "@/utils/util";
export default {
  name: 'home',
  components: { Loading },
  data() {
    return {
      showLoad: true
    };
  },
  created() {
    let query = this.$route.query;
    if (query&&query.code) {
      this.handleLogin(query.code);
    } else {
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ wxConfig.appid +'&redirect_uri=' +
        encodeURI(location.href) +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    handleLogin(code) {
      let data = {
        mk: getEncrypted(code, wxConfig.appid),
        credentials: code
      };
      authLogin(data).then(res => {
        if (res.code == 200 && res.success) {
            jsCookies.remove('token');
            jsCookies.remove('userinfo');
            jsCookies.set('token', res.data.token);
          if (!res.data.isBind) {
            let query = this.$route.query;
            if (query.path) {
              this.$router.push(`/user/bind?path=${query.path}`)
            } else {
              this.$router.push('/user/bind')
            }
            this.showLoad = false
          } else {
            this.getUserInfoData()
          }
        } else {
          location.href = '/'
          this.$toast(res.message);
        }
      });
    },
    getUserInfoData() {
      getUserInfo().then(ret => {
        this.showLoad = false
        if (ret.code == 200 && ret.success) {
          jsCookies.set('userinfo', JSON.stringify(ret.data))
          let query = this.$route.query;
          if (query.path) {
            this.$router.push(query.path)
          } else {
            this.$router.push('/user/set')
          }
        } else {
          // this.$toast.fail(ret.message)
          jsCookies.remove('token');
          jsCookies.remove('userinfo');
        }
      })
    }
  }
};
</script>
