<template>
  <div>
    <button @click="handlePay">调起支付</button>
  </div>
</template>
<style lang="scss" scoped>
  
</style>
<script>
import {wechatPay} from '@/api/wechatPay'
export default {
  name: 'test',
  components: {},
  data () {
    return {
      
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    handlePay() {
      let orderNo = '20200605204805482'
      wechatPay(orderNo).then(res => {
        console.log(res);
      })
    }
  }
}
</script>
