<template>
<div class="alphabet-box clearfix">
  <ul class="list" ref="alp" >
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @click="handleLetterClick"
    >{{item}}</li>
  </ul>
</div>
  
</template>

<script>
export default {
  name: 'Alphabet',
  props: {
    list: Object
  },

  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    };
  },
  computed: {
    letters() {
      const letters = [];
      for (let i in this.list) {
        letters.push(i);
      }
      return letters;
    }
  },
  updated() {
    if (this.letters && this.letters.length) {
      this.startY = this.$refs[this.letters[0]][0].offsetTop;
    }
  },
  mounted() {
  },
  methods: {
    handleLetterClick(e) {
      this.$emit('change', e.target.innerText);
    },
    handleTouchStart() {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79;
          const index = Math.floor((touchY - this.startY) / 20);
          if (index >= 0 && index < this.letters.length) {
            console.log(this.letters[index]);
            this.$emit('change', this.letters[index]);
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/base";
.alphabet-box {}
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 96px;
  right: 10px;
  bottom: 0;
  width: 20px;
  z-index: 2;
  .item {
    line-height: 20px;
    text-align: center;
    color: rgb(134, 134, 221);
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
