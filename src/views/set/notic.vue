<template>
  <div class="notic-wrapper">
    <div class="line10"></div>
    <van-cell center title="新订单提醒" class="notic-item">
      <template #right-icon>
        <van-switch v-model="new_order_for_mp" size="24" active-color="#07c160" inactive-color="#dddddd" @change="switchChange(new_order_for_mp, 'new_order_for_mp')" />
      </template>
    </van-cell>

    <div class="line10"></div>
    <van-cell center title="订单超时提醒" class="notic-item">
      <template #right-icon>
        <van-switch v-model="order_overtime_for_expert" size="24" active-color="#07c160" inactive-color="#dddddd" @change="switchChange(order_overtime_for_expert, 'order_overtime_for_expert')"/>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { setUpInfo, getUserInfo } from '@/api/user'
import jsCookies from 'js-cookie'
export default {
  name: 'notic',
  components: {},
  data() {
    return {
      new_order_for_mp: false,
      order_overtime_for_expert: false,
      outTimeNotic: true,
      setupStatus: []
    };
  },
  created() {},
  mounted() {
    this.setupStatus = this.userInfo && this.userInfo.expertInfo ? this.userInfo.expertInfo.setupStatus : []
    this.initStatue()
  },
  computed: {
    userInfo(){
      let userInfo = JSON.parse(jsCookies.get('userinfo')) || null
      if (userInfo) {
        userInfo['avatar'] = userInfo.userTypeCode == 1 ? userInfo.expertInfo.avatar : userInfo.memberInfo.avatar
        userInfo['level'] = userInfo.userTypeCode == 0 ? userInfo.memberInfo.memberLevel : ''
      }
      return userInfo
    }
  },
  watch: {},
  methods: {
    initStatue() {
      this.new_order_for_mp = this.setupStatus.filter(v => v.setupCode == 'new_order_for_mp')[0].isEnable
      this.order_overtime_for_expert = this.setupStatus.filter(v => v.setupCode == 'order_overtime_for_expert')[0].isEnable
    },
    switchChange(item, code) {
      let data = {
        isEnable: item,
        setupCode: code
      }
      setUpInfo(data).then(res => {
        if (res.code == 200 && res.success) {
          this.getUserInfoData()
        } else {
          this[code] = !item
        }
      })
    },
    getUserInfoData() {
      getUserInfo().then(ret => {
        if (ret.code == 200 && ret.success) {
          jsCookies.set('userinfo', JSON.stringify(ret.data))
        } else {
          jsCookies.remove('token');
          jsCookies.remove('userinfo');
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.notic-wrapper{
  background:rgba(245,245,245,1);
  width: 100%;
  height: 100vh;
  .notic-item{
    height: 50px;
  }
}
</style>