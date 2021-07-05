<template>
  <div class="my-dropdown">
    <van-dropdown-menu
      ref="uDropdown"
      active-color="#FF5948"
      inactive-color="#666666"
      class="u-dropdown"
      height="88"
      v-if="filterData"
    >
      <template v-for="(item, key) in filterData">
        <template
          v-if="
            ['taxTags', 'livePlaybackTypes', 'livePlaybackTeachers'].includes(
              key
            )
          "
        >
          <van-dropdown-item
            :ref="key"
            :title="key | formatFilterlist"
            :key="key"
          >
            <comp-tax-filter
              :options="item"
              :keyWord="key"
              :optionsKey="getOption(key)"
              @handleDropdownClose="handleDropdownClose"
            ></comp-tax-filter>
          </van-dropdown-item>
        </template>
      </template>
      <van-dropdown-item
        title-class="search"
        ref="search"
        key="search"
        icon="search"
        title=""
        style="
           {
            flex: 0.4;
          }
        "
      >
        <van-search
          v-model="keyWord"
          show-action
          placeholder="请输入搜索关键词"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
import CompTaxFilter from "./components/CompTaxFilter.vue";
import { mapGetters } from "vuex";
export default {
  inject: ["reloadList"],
  components: {
    CompTaxFilter,
  },
  computed: {
    ...mapGetters({
      listParams: "listParams",
      filterData: "filterData",
      listResult: "listResult",
    }),
    condition() {
      return {
        ...this.listParams.condition,
      };
    },
    searchForm() {
      return {
        ...this.listParams.condition,
      };
    },
  },
  data() {
    return {
      keyWord: "",
      orderFieldVal: 0,
      categoryVisiabled: false,
      visiabled: false,
    };
  },
  filters: {
    formatFilterlist(val) {
      switch (val) {
        case "taxTags":
          return "相关税种";
        case "livePlaybackTypes":
          return "课程分类";
        case "livePlaybackTeachers":
          return "讲师";
      }
    },
  },
  methods: {
    onSearch(e) {
      this.$store.commit("SET_LISTKEYWORDCON", {
        ...this.listParams.condition,
        searchCondition: this.keyWord,
      });
      this.handleReList();
      this.$refs["search"].toggle();
    },
    getOption(key) {
      switch (key) {
        case "taxTags":
          return { label: "name", value: "id" };
        case "livePlaybackTypes":
          return { label: "liveTypeName", value: "id" };
        case "livePlaybackTeachers":
          return { label: "teacher", value: "teacher" };
      }
    },
    handleDropdownChange(e, item) {
      this.condition.orderField[0] = e;
      this.$store.commit("SET_LISTKEYWORDCON", this.condition);
      this.reloadList();
    },
    showUviewPicker(e) {
      this.$refs.uDropdown.toggleItem();
      this.visiabled = true;
    },
    handlePopupTree() {
      this.categoryVisiabled = false;
      this.handleReList();
    },
    handleReList() {
      this.$store.commit("SET_LISTPARAMSCOPE", this.searchForm);
      this.reloadList();
    },
    handleDropdownClose(obj) {
      this.$refs[obj.key][0].toggle();
    },
    handleResetClick() {
      this.$refs.secondaryCategoryFilterData.$children[0].setCheckAll(false);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .van-dropdown-menu__title {
  font-size: 14px;
}
.u-dropdown {
  /deep/.van-dropdown-menu__item:last-child {
    flex: 0.4 !important;
  }
}
/deep/ .search {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  .van-ellipsis {
    display: inline-block;
  }
}
/deep/ .search::after {
  /* content: "\F0AF"; */
  display: none;
}
/deep/ .search::before {
  content: "";
  width: 20px;
  height: 30px;
  background: url("~@/assets/imgs/search.png") no-repeat center center;
  background-size: contain;
  display: inline-block;
  margin-right: 5px;
}
.searchButton {
  width: 20%;
  color: #323233;
  font-size: 0.46rem;
  /* line-height: 22px; */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.my-dropdown {
  width: 100%;
}
.last-item {
  margin-right: 42rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  .u-flex {
    color: #606266;
    border-left: 1px solid #eee;
    width: 142rpx;
    padding-left: 30rpx;
    height: 40rpx;
    display: flex;
    justify-content: flex-end;
    align-items: end;
  }
}

.u-dropdown {
  flex: 1;
  .u-search-popup {
    background: #fff;
    height: 100%;
    width: 100%;
    padding-top: 0 !important;
    border-top: 1px solid #f6f6f6;

    .u-radio {
      margin-left: auto;
      margin-right: -20rpx;
    }

    .u-tree-title {
      background-color: #f5f5f5;

      .u-tree-item {
        width: 100%;
        padding: 24rpx 30rpx;
        background-color: #fff;
        margin-bottom: 20rpx;
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }
  }
}

.my-dropdown {
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}

.ly-tree-node__count {
  font-size: 24rpx;
  color: #999999;
}
</style>
