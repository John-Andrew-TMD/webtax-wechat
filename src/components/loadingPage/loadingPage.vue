<template>
  <div class="loading-wrap">
    <div class="loader">
      <div class="loader_overlay"></div>
      <div class="loader_cogs">
        <div class="loader_cogs__top">
          <div class="top_part"></div>
          <div class="top_part"></div>
          <div class="top_part"></div>
          <div class="top_hole"></div>
        </div>
        <div class="loader_cogs__left">
          <div class="left_part"></div>
          <div class="left_part"></div>
          <div class="left_part"></div>
          <div class="left_hole"></div>
        </div>
        <div class="loader_cogs__bottom">
          <div class="bottom_part"></div>
          <div class="bottom_part"></div>
          <div class="bottom_part"></div>
          <div class="bottom_hole"></div>
        </div>
        <p>loading</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loading-wrap {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 9999;
  font-family: "Montserrat", sans-serif;
  text-align: center;
  overflow: hidden;
  background-color: #ffffff
}

.loading-wrap p {
  margin: 0 auto;
}
.loading-wrap .loader {
  height: 100%;
  position: relative;
  margin: auto;
  width: 100%;
}
.loading-wrap .loader_overlay {
  width: 100px;
  height: 100px;
  background: transparent;
  box-shadow: 0px 0px 0px 1000px rgba(255, 255, 255, 0.67),
    0px 0px 19px 0px rgba(0, 0, 0, 0.16) inset;
  border-radius: 100%;
  z-index: -1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.loading-wrap .loader_cogs {
  z-index: -2;
  width: 100px;
  height: 100px;
  top: -120px !important;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.loading-wrap .loader_cogs__top {
  position: relative;
  width: 100px;
  height: 100px;
  -webkit-transform-origin: 50px 50px;
  transform-origin: 50px 50px;
  -webkit-animation: rotate 10s infinite linear;
  animation: rotate 10s infinite linear;
}
.loading-wrap .loader_cogs__top div:nth-of-type(1) {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}
.loading-wrap .loader_cogs__top div:nth-of-type(2) {
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
}
.loading-wrap .loader_cogs__top div:nth-of-type(3) {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.loading-wrap .loader_cogs__top div.top_part {
  width: 100px;
  border-radius: 10px;
  position: absolute;
  height: 100px;
  background: #f98db9;
}
.loading-wrap .loader_cogs__top div.top_hole {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: white;
  position: absolute;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.loading-wrap .loader_cogs__left {
  position: relative;
  width: 80px;
  -webkit-transform: rotate(16deg);
  transform: rotate(16deg);
  top: 28px;
  -webkit-transform-origin: 40px 40px;
  transform-origin: 40px 40px;
  animation: rotate_left 10s 0.1s infinite reverse linear;
  left: -24px;
  height: 80px;
}
.loading-wrap .loader_cogs__left div:nth-of-type(1) {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}
.loading-wrap .loader_cogs__left div:nth-of-type(2) {
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
}
.loading-wrap .loader_cogs__left div:nth-of-type(3) {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.loading-wrap .loader_cogs__left div.left_part {
  width: 80px;
  border-radius: 6px;
  position: absolute;
  height: 80px;
  background: #97ddff;
}
.loading-wrap .loader_cogs__left div.left_hole {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: white;
  position: absolute;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.loading-wrap .loader_cogs__bottom {
  position: relative;
  width: 60px;
  top: -65px;
  -webkit-transform-origin: 30px 30px;
  transform-origin: 30px 30px;
  -webkit-animation: rotate_left 10.2s 0.4s infinite linear;
  animation: rotate_left 10.2s 0.4s infinite linear;
  -webkit-transform: rotate(4deg);
  transform: rotate(4deg);
  left: 79px;
  height: 60px;
}
.loading-wrap .loader_cogs__bottom div:nth-of-type(1) {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}
.loading-wrap .loader_cogs__bottom div:nth-of-type(2) {
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
}
.loading-wrap .loader_cogs__bottom div:nth-of-type(3) {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.loading-wrap .loader_cogs__bottom div.bottom_part {
  width: 60px;
  border-radius: 5px;
  position: absolute;
  height: 60px;
  background: #ffcd66;
}
.loading-wrap .loader_cogs__bottom div.bottom_hole {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: white;
  position: absolute;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

/* Animations */
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate_left {
  from {
    -webkit-transform: rotate(16deg);
    transform: rotate(16deg);
  }
  to {
    -webkit-transform: rotate(376deg);
    transform: rotate(376deg);
  }
}
@keyframes rotate_left {
  from {
    -webkit-transform: rotate(16deg);
    transform: rotate(16deg);
  }
  to {
    -webkit-transform: rotate(376deg);
    transform: rotate(376deg);
  }
}
@-webkit-keyframes rotate_right {
  from {
    -webkit-transform: rotate(4deg);
    transform: rotate(4deg);
  }
  to {
    -webkit-transform: rotate(364deg);
    transform: rotate(364deg);
  }
}
@keyframes rotate_right {
  from {
    -webkit-transform: rotate(4deg);
    transform: rotate(4deg);
  }
  to {
    -webkit-transform: rotate(364deg);
    transform: rotate(364deg);
  }
}
</style>
<script>
export default {
  name: '',
  components: {},
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
