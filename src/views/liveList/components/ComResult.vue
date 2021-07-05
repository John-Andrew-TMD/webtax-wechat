<template>
  <div id="app-tip" class="app-tip">
    <div class="app-tip-title">
      共搜索出
      <span style="color: #ff5948">{{
        listResult.total | filterCountOver
      }}</span>
      条结果
    </div>
    <div style="max-height: 300px" class="filter-box app-list scroll-view">
      <div class="list-row" v-if="listParams.condition.searchCondition">
        <!-- <view class="list-label"> 关键词: </view> -->
        <div class="list-content">
          <van-badge class="list-item" color="gray">
            {{ listParams.condition && listParams.condition.searchCondition }}
            <template #content>
              <van-icon
                name="cross"
                class="badge-icon"
                @click="handleResetClick"
              />
            </template>
          </van-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  inject: ["reloadList"],
  props: {},
  computed: {
    ...mapGetters({
      listParams: "listParams",
      listResult: "listResult",
    }),
  },
  data() {
    return {
      filterkey: {
        livePlaybackTypes: "课程分类",
        livePlaybackTeacher: "讲师",
        taxTags: "税种",
      },
    };
  },
  methods: {
    handleResetClick() {
      this.$store.commit("SET_LISTKEYWORDCON", {
        ...this.listParams.condition,
        searchCondition: "",
      });
      this.reloadList();
    },
    getShow(item) {
      if (item instanceof Array) {
        if (item.length) {
          return true;
        } else {
          return false;
        }
      } else {
        return item;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .van-badge {
  padding: 1px !important;
  border-radius: 100% !important;
  font-size: 9px !important;
  min-width: auto;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-tip {
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 15px;
  .app-tip-title {
    font-size: 14px;
    color: #333333;

    span {
      color: #ff5948;
    }
  }
}
.app-list {
  border-bottom: none;
  padding-top: 5px;
  padding-bottom: 0px;

  .list-row {
    .list-label {
      color: #999999 !important;
      text-align: left;
      font-size: 14px;
    }

    .list-content {
      .list-item {
        position: relative;
        display: inline-block;
        background: #f5f5f5;
        border-radius: 11px;
        font-size: 12px;
        color: #666666;
        padding: 4px 11px;
        margin-right: 10px;
        margin-bottom: 10px;
        .list-flex {
          height: 22px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>