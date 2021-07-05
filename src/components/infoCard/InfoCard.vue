<template>
  <div class="card-wrap">
    <div v-for="(item,index) in itemlist" :key="index">
      <div class="card-box" v-if="index%2==0">
        <img class="card-wrap_img" src="~@/assets/img/register-bg@2x.png" alt />
        <div class="card-wrap_content">
          <h2 class="card-wrap_content-tit">{{item.title}}</h2>
          <p class="card-wrap_content-info">{{item.line1}}</p>
          <p class="card-wrap_content-info">{{item.line2}}</p>
        </div>
      </div>
      <div class="card-box" v-if="index%2==1">
        <div class="card-wrap_content">
          <h2 class="card-wrap_content-tit">{{item.title}}</h2>
          <p class="card-wrap_content-info">{{item.line1}}</p>
          <p class="card-wrap_content-info">{{item.line2}}</p>
        </div>
        <img class="card-wrap_img" src="~@/assets/img/register-bg@2x.png" alt />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card-wrap {
 
}
.card-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}

.card-wrap_img {
  width: 120px;
  height: 120px;
}
.card-wrap_content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-wrap_content-tit {
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  margin-bottom: 15px;
}
.card-wrap_content-info {
  max-width: 180px;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
  letter-spacing: 1px;
}
</style>
<script>
export default {
  name: 'infoCard',
  components: {},
  props:{
    itemlist: {
      type: Array
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
