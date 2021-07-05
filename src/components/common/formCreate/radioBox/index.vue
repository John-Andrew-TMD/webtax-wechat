<template>
  <div class="keyword-block">
    <div class="keyword keyword-checkbox">
      <van-row class = "mt-row" type="flex" gutter = "10">
      <van-col span="8" :key="item.code" v-for="(item, index) in arr">
        <div class="flex-1 radio-btn mb-10" :class="{ isChecked: item.checked }">
          <span class="checkbox__label">
            {{ item.name || item.label }}
            <br />
            <span class="checkbox__count" v-if="showCount"
              >（{{ options[index].count }}条）</span
            >
          </span>
          <div
            class="checkbox__original"
            @click="onClick(item, index)"
            :id="item.code"
          ></div>
        </div>
      </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  // other code
  props: {
    value: {
      type: String,
      default: "",
    },
    onlyCode: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    showCount: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      arr: [],
      checked: true,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.options = this.options.map((item) => {
            if (item.code == val) {
              item.checked = true;
            }
            return item;
          });
        }
      },
      immediate: true,
      deep: false,
    },
  },
  mounted() {
    this.arr = this.options;
  },
  methods: {
    onClick(item, index) {
      this.handleResetClick();
      this.$set(this.arr, index, { ...item, checked: !item.checked });
      let itemChecked = this.arr.filter((item) => item.checked);
      if (this.onlyCode) {
        this.$emit(
          "update:check-box-value",
          itemChecked.map((item) => item.code)[0]
        );
      } else {
        this.$emit("update:check-box-value", itemChecked[0]);
      }

      //   this.$nextTick(() => {
      this.$emit("handleReList", null);
      //   });
    },
    handleResetClick() {
      this.arr.forEach((item) => {
        item.checked = false;
      });
      let itemChecked = this.arr.filter((item) => item.checked);
      if (this.onlyCode) {
        this.$emit("update:check-box-value", "");
      } else {
        this.$emit("update:check-box-value", {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mt-row{
  width: 100%;
}
.keyword-block{
  width: 100%;
}
</style>
