<template>
  <div class="loader">
    <div>答</div>
    <div>税</div>
    <div>W</div>
    <div>E</div>
    <div>B</div>
    <div>T</div>
    <div>A</div>
    <div>X</div>
  </div>
</template>
<style lang="scss" scoped>
/* Start the loader code, first, let's align it the center of screen */
.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  /* disable selection and cursor changes */
  user-select: none;
  cursor: default;
  min-width: 250px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.loader div {
  position: relative;
  width: 24px;
  height: 24px;
  background: #fff;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  margin: 0 5px;
  // float: left;
  font-size: 14px;
  line-height: 24px;
  animation: bounce 1.5s infinite ease-in-out;
}

.loader div:after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 2px;
  width: 20px;
  height: 8px;
  background: #dddddd;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
}

.loader div:nth-child(1) {
  animation: bouncefirst 1.5s infinite ease-in-out;
  animation-delay: 0ms;
  background: #db2f00;
  color: #fff;
}

.loader div:nth-child(2) {
  animation-delay: 50ms;
  background: #ff6d37;
  color: #fff;
}

.loader div:nth-child(3) {
  animation-delay: 100ms;
  background: #ffa489;
  color: #fff;
}

.loader div:nth-child(4) {
  animation-delay: 150ms;
  background: pink;
  color: #fff;
}

.loader div:nth-child(5) {
  animation-delay: 200ms;
  background: #99d3d4;
  color: #fff;
}

.loader div:nth-child(6) {
  animation-delay: 250ms;
  background: #56bebf;
  color: #fff;
}

.loader div:nth-child(7) {
  animation-delay: 300ms;
  color: #fff;
  background: #cfb41a;
}
.loader div:nth-child(8) {
  animation-delay: 350ms;
  color: #fff;
  background: #e94d10;
}
@keyframes bouncefirst {
  0% {
    transform: translateX(0px);
  }
  20% {
    transform: translateX(-10px);
  }
  25% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(30px);
  }
  80% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes bounce {
  0% {
    transform: translateX(0px);
  }
  20% {
    transform: translateX(0px);
  }
  28% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(30px);
  }
  80% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>
<script>
export default {
  name: 'Loading',
  components: {},
  props: {
    tips: {
      default: ''
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {
    tips(v) {
      if (v) {
        this.$toast(v)
      }
    }
  },
  methods: {}
};
</script>
