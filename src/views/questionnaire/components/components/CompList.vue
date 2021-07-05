<template>
  <div class=" fake-table" ref="tableDom">
    <van-row v-if = "listOptions.showHead" class="fake-table__head">
      <van-col
        class="col"
        :class="item.prop"
        v-for="(item, index) in headData"
        :key="index"
        :span="item.span || 24 / headData.length"
        >{{ item.name }}</van-col
      >
    </van-row>
    <template v-if="bodyData.length">
      <van-row
        class="fake-table__body "
        v-for="(item, index) in bodyData"
        :key="index"
      >
        <template v-for="(colItem, colIndex) in headData">
          <van-col
            class="col"
            :span="colItem.span || 24 / headData.length"
            :key="colIndex"
            v-if="colItem.prop"
          >
            <div v-if="colItem.slot" :style="colItem.style">
              <slot :name="colItem.prop" :scope="item" />
            </div>
            <div
              v-else-if="colItem.filter"
              :style="colItem.style"
              v-html="colItem.filter(item)"
            ></div>

            <div class="span" :style="colItem.style" v-else>
              {{ item[colItem.prop] }}
            </div>
          </van-col>
        </template>
      </van-row>
      <van-row class="fake-table__body" v-if="listOptions.showPagination&&!showLoading">
        <van-col
          v-if="pageCount > bodyData.length"
          class="link-more col"
          :span="24"
          @click="handleMoreClick"
        >
          查看更多
        </van-col>
        <!-- <van-col v-else class="link-more col" :span="24">
          {{ listOptions.showNodata }}
        </van-col> -->
      </van-row>
    </template>
    <template v-else>
      <div class="fake-table__body nodata" v-if = "!showLoading">
        {{ listOptions.showNodata }}
      </div>
    </template>
    <van-button
      loading
      v-if="showLoading"
      class="loading-btn"
      type="default"
      size="large"
      loading-text="加载中..."
    />
    <div
      v-transfer-dom="'body'"
      id="app-list-fixed"
      class="app-list-item app-list-fixed"
      v-if="listOptions.showFixed && selfData"
    >
      <div class="member-ser">
        {{
          +selfData.rankingNum > 99 || +selfData.rankingNum == 0
            ? "未上榜"
            : selfData.rankingNum
        }}
      </div>
      <div class="menber-avatar mr-5">
        <img :src="selfData.avatar" />
      </div>
      <div class="member-name">{{ selfData.memberName || "用户名" }}</div>
      <div class="member-recordIndex">{{ selfData.generalNum||0 }}关</div>
      <div class="member-recordIndex">{{ selfData.difficultNum||0 }}关</div>
      <div class="member-recordIndex">
        {{ (selfData.generalNum + selfData.difficultNum)||0 }}关
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRankPage,
  getExamRankingInvite
} from "@/api/questionnaire/api-questionnaire";
import jsCookies from "js-cookie";
import { post } from "@/axios";
import CompStartVue from '../questionnaire-mng/components/CompStart.vue';
export default {
  props: {
    headData: {
      type: Array,
      default: () => []
    },

    options: {
      type: Object,
      default: () => {
        return { showFixed: false, showNodata: "暂无数据" };
      }
    },
    limit: {
      type: Number,
      default: 101
    }
  },
  data() {
    return {
      listOptions: {
        columns: [],
        showPagination: true, // 是否显示分页
        showTools: false, // 是否显示工具栏
        showCheckbox: false, // 是否显示多选
        showSerialNumber: false, // 是否显示序号
        fixedSerialNumber: false, // 是否固定序号
        requestImmediate: true, // 是否立刻请求
        showLoading: true, // 是否显示Loading
        selectedRow: -1, // 设置选中的行数
        requestParams: {}, // 请求参数
        colspanAttrs: [],
        tableName: "",
        showFixed: false,
        showNodata: "暂无数据",
        showHead:true
      },
      showLoading: false,
      pageNo: 1,
      pageCount: 0,
      requestData: null, // 请求参数
      rankUserInfo: {
        sumRedpack: 0,
        recordIndex: 0
      },
      returnData:{},
      selfData:{},
      tableData: [],
      isExist:false,
    };
  },
  watch: {},
  computed: {
    userInfo() {
      let str = localStorage.getItem("userinfo");
      return typeof str == "string" ? JSON.parse(str) : {};
    },
    bodyData() {
      return this.tableData.filter((v, i) => i < this.limit);
    }
  },
  components: {},
  created() {
    this.listOptions = Object.assign(this.listOptions, this.options);
    this.requestData = this.listOptions.requestParams.data;
    // 如果不显示页码
    !this.listOptions.showPagination && (this.pageSize = 1000);
    if (this.listOptions.requestImmediate) {
      this.getListData();
    }
  },
  mounted() {
    this.isExist = this.isChildOf(document.body, document.getElementById("app-list-fixed"))
    this.$emit("input", this.$refs.tableDom);
  },
  destroyed() {
    if (this.isExist) {
      document.body.removeChild(document.getElementById("app-list-fixed"));
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isExist) {
      document.body.removeChild(document.getElementById("app-list-fixed"));
    }
    next();
  },
  methods: {
    isChildOf(parent, child) {
        var parentNode;
        if(child && parent) {
            parentNode = child.parentNode;
            while(parentNode) {
                if(parent === parentNode) {
                    return true;
                }
                parentNode = parentNode.parentNode;
            }
        }
        return false;
    },
    getListData(showLoading = true) {
      this.showLoading = showLoading;
      const url = this.listOptions.requestParams.url;

      let data = {
        ...this.requestData,
        pageNo: this.pageNo
      };
      post(url, data)
        .then(res => {
          this.returnData = res;
          if (!res.data) {
            this.tableData = [];
            this.pageCount = 0;
            return;
          }
          let records = [];
          if (this.listOptions.dataCallbackFn) {
            records = this.listOptions.dataCallbackFn(res);
          }else if(res.data.overallRanking||res.data.selfRanking){
            this.selfData = res.data.selfRanking
            records = res.data.overallRanking.records
          }
          else if(res.data.withdrawList){
            records = res.data.withdrawList.records
             this.pageCount =res.data.withdrawList.total;
          }
           else if (
            !Array.isArray(res.data.records) ||
            !res.data.records.length
          ) {
            this.tableData = [];       
            this.pageCount = 0;
            return;
          }  else {
            records = res.data.records;
             this.pageCount = res.data.total;
          }
          this.tableData = this.tableData.concat(Object.freeze(records));
         
          // 选中某行
        })
        .catch(err => {
          this.$toast.fail(err);
        })
        .finally(res => {
          this.showLoading = false;
          this.$emit("request-complete", this.returnData);
        });
    },
    handleMoreClick() {
      this.pageNo++;
      this.getListData();
    },
    getIndexImg(index) {
      return require(`assets/imgs/questionnaire/${index}@2x.png`);
    },
    // 表格刷新
    refreshList(showLoading = false) {
      this.getListData(showLoading);
    },
    initUI() {
      // if (this.bodyData !== null && typeof currentIndex !== "number") {
      //   this.handlebodyData(this.bodyData);
      //   return;
      // }
      // console.log(currentIndex);
      // responsePost[currentIndex]({
      //   searchCount: true,
      //   pageNo: 1,
      //   pageSize: this.pageSize,
      //   sort: [],
      //   orderField: [],
      //   condition: {
      //     examId: localStorage.getItem("examId") || ""
      //   }
      // }).then(res => {
      //   if (res.code === 200) {
      //     this.bodyData = res.data.records.map((item, index) => {
      //       return { ...item, index: index + 1 };
      //     });
      //     this.handlebodyData(this.bodyData);
      //   } else {
      //     this.$toast.fail(res.message);
      //   }
      // });
    }
    // handlebodyData(bodyData) {
    //   if (this.listOptions.showFixed) {
    //     this.rankUserInfo = bodyData.filter(
    //       (item, index) => +item.mpUserId == +this.userInfo.mpUserId
    //     )[0] || {
    //       index: "99+",
    //       avatar: this.userInfo.headimgurl,
    //       memberName: this.userInfo.nickname
    //     };
    //   }
    //   // this.$emit("get-table-data", bodyData);
    // }
  }
};
</script>
<style lang="scss">
.fake-table {
  .fake-table__body {
    .member-index-img {
      width: 30px;
      height: 30px;
      margin-top: 5px;
    }
    .app-list-item {
      display: flex;
      align-items: center;
      .menber-avatar {
        width: 28px;
        height: 28px;
        background-color: #fff;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .member-name {
        flex: 1;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
<style lang="scss" scoped>

.nodata {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
}
.fake-table {
  .fake-table__head {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
  &__head,
  &__body {
    &:not(:last-child) {
      border-bottom: 1px dashed #233d7b !important;
    }
  }
  &__head {
    height: 40px;
    .col {
      text-align: center;
    }
    .memberName {
      text-align: left;
    }
    .col:extend(.table-col) {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      padding: 10px;
    }
    & > div {
      text-align: center;
    }
  }
  &__body {
    .col {
      min-height: 57px;
      display: flex;
      justify-content: center;
      align-items: center;
      .span {
        text-align: center;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & > div {
        text-align: center;
      }
      & div {
        width: 100%;
        font-size: 12px;
        color: #eeeeee;
      }
    }
    .memberName {
      text-align: left;
    }
    .col:extend(.table-col) {
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
      padding: 10px 10px 10px calc(10px - 5px);
      &:last-child {
        padding-left: 5px;
      }
    }
    .link-more {
      min-height: 57px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-family: PingFangHK-Regular, PingFangHK;
      font-weight: 400;
      color: #eeeeee;
      line-height: 20px;
    }
  }
}
/deep/ .loading-btn{
  margin-top: 0!important;
}
.app-list-fixed {
  color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: no-wrap;
  padding: 15px 5.97% !important;
  background-color: #031642;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  .menber-avatar {
    width: 28px;
    height: 28px;
    background-color: #fff;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .member-ser {
    font-size: 13px;
    width: 16%;
    text-align: center;
  }
  .member-name {
    font-size: 14px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .member-recordIndex {
    width: 15%;
    font-size: 12px;
    font-family: PingFangHK-Regular, PingFangHK;
    font-weight: 400;
    color: #eeeeee;
    line-height: 17px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
}
.app-list-item:not(:last-child) {
  border-bottom: 1px dashed #233d7b;
}
</style>
