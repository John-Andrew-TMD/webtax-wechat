<template>
  <div class="live-path-wrapper">
    <loading v-show="showLoad" class="loadding-icon"></loading>
  </div>
</template>
<script>
import { getPromote } from '@/api/promote'
import {Loading } from '@/components/loading';
export default {
  name: 'PromotePartner',
  components: { Loading },
  data() {
    return {
      showLoad: true
    };
  },
  created() {
    let id = this.$route.params.id
    let promoteNo = this.$route.query.promoteNo
    if (id && promoteNo) {
      this.getPathId(id, promoteNo)
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    getPathId(id, promoteNo) {
      getPromote(id, promoteNo).then(res=>{
        let _ret = res.data;
        this.showLoad = false
        if (res.success) {
          if (_ret.jumpMode == 0) {
            window.location.href = _ret.jumpAddress
          } else {
            
          }
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.live-path-wrapper{
  font-size: 14px;
}
</style>