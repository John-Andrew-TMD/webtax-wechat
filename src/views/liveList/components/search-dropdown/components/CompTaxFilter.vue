<template>
  <div class="u-search-popup tax">
    <div class="scroll-view" scroll-y="true" style="max-height: 500px">
      <checked-box
        v-if="keyWord !== 'livePlaybackTypes'"
        ref="checkedBox"
        :value="searchForm[keyWord]"
        :onlyCode="true"
        :showCount="false"
        :options="
          options.map((el) => ({
            label: el[optionsKey.label],
            code: el[optionsKey.value],
          }))
        "
        :check-box-value.sync="searchForm[keyWord]"
      >
      </checked-box>
      <template v-else>
        <van-checkbox-group v-model="searchForm[keyWord]" checked-color = "#FF5948">
          <van-cell-group>
            <van-cell
              title-class="mt-van-cell"
              v-for="(el, index) in options"
              clickable
              :key="index"
              :title="el[optionsKey.label]"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="el[optionsKey.value]" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </template>
    </div>
    <div class="u-popup-bottom">
      <van-button
        plain
        color="#FF5948"
        type="primary"
        class="u-popup-button"
        @click="handleResetClick()"
        >重置</van-button
      >
      <van-button
        class="u-popup-button"
        color="#FF5948"
        @click="handleDropdownClose()"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
import checkedBox from "@/components/common/formCreate/checkedBox";
import { mapGetters } from "vuex";
export default {
  inject: ["reloadList"],
  components: {
    checkedBox,
  },
  props: {
    optionsKey: {
      type: Object,
      default: () => ({ label: "name", value: "id" }),
    },
    keyWord: {
      type: String,
      default: "taxTags",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      listParams: "listParams",
      filterData: "filterData",
      listResult: "listResult",
    }),
  },
  data() {
    return {
      searchForm: {},
    };
  },
  watch: {
    listParams: {
      handler(listParams) {
        this.searchForm = {
          taxTags: listParams.condition.taxTags,
          livePlaybackTeachers: listParams.condition.livePlaybackTeachers,
          livePlaybackTypes: listParams.condition.livePlaybackTypes || [],
        };
      },
      immediate: true,
    },
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    handleDropdownClose() {
      this.handleReList();
      this.$emit("handleDropdownClose", {
        checked: this.searchForm[this.keyWord].length,
        key: this.keyWord,
      });
    },
    handleReList(value) {
      this.$store.commit("SET_LISTPARAMSCOPE", this.searchForm);
      this.reloadList();
    },
    handleResetClick() {
      if (this.$refs.checkedBox) {
        this.$refs.checkedBox.handleResetClick();
      } else {
        this.searchForm.livePlaybackTypes = [];
      }
      // this.handleReList()
    },
  },
};
</script>

<style lang="scss" scoped>
.mt-van-cell {
  span {
    float: left;
  }
}
.u-popup-button {
  width: 165px;
  border-radius: 5px;
  height: 33px;
}
.u-search-popup {
  background: #fff;
  height: 100%;
  width: 100%;
  padding-top: 0 !important;
  border-top: 1px solid #f6f6f6;
}
</style>
