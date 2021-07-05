<template>
  <div class="rank-list">
    <van-row>
      <van-col
        v-for="(item, index) in headData"
        :key="index"
        :span="24/headData.length"
        >{{item.text}}</van-col
      >
    </van-row>
    <van-row>
      <van-col
        v-for="(item, index) in tableData"
        :key="index"
        :span="24/headData.length"
        >{{item.text}}</van-col
      >
    </van-row>
    <!-- <ul
      class="app-content-wrapper"
      :class="{ 'rank-wrapper': $route.name == 'rank' }"
    >
      <li
        class="app-list-item "
        v-for="(item, index, key) in tableData"
        :key="key"
      >
        <div v-if="+rankUserInfo.index <= 3" class="member-ser mr-10">
          <img
            class="member-index-img"
            :src="getIndexImg(+rankUserInfo.index)"
            alt=""
            srcset=""
          />
        </div>
        <div v-else class="member-ser mr-10">{{ index + 1 }}</div>
        <div class="menber-avatar mr-5">
          <img :src="item.avatar" alt="" srcset="" />
        </div>
        <div class="member-name">{{ item.memberName || "用户名" }}</div>
        <div class="member-recordIndex">通关{{ item.recordIndex || 0 }}次</div>
      </li>
    </ul> -->
    <div
      v-transfer-dom="'body'"
      id="app-list-fixed"
      class="app-list-item app-list-fixed"
      v-if="listOptions.showFixed"
    >
      <div class="member-ser mr-10">
        {{ +rankUserInfo.index > 99 ? "未上榜" : rankUserInfo.index }}
      </div>
      <div class="menber-avatar mr-5">
        <img :src="rankUserInfo.headimgurl" />
      </div>
      <div class="member-name">{{ rankUserInfo.memberName || "用户名" }}</div>
      <div class="member-recordIndex" v-if="rankUserInfo.recordIndex">
        通关{{ rankUserInfo.recordIndex }}次
      </div>
      <div class="member-recordIndex" v-else>
        当前未上榜
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
import { mapGetters } from "vuex";
var responsePost = [getRankPage, getExamRankingInvite];
export default {
  props: {
    headData: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    tableData: {
      type: Array,
      default: null
    },
    pageSize: {
      type: Number,
      default: 10
    },
    listOptions: {
      type: Object,
      default: () => {
        return { showFixed: false };
      }
    }
  },
  data() {
    return {
      rankUserInfo: {
        sumRedpack: 0,
        recordIndex: 0
      }
    };
  },
  watch: {
    currentIndex: {
      handler(val, oldval) {
        this.initUI(val);
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['examId']),
    userInfo() {
      let str = localStorage.getItem("userinfo");
      return typeof str == "string" ? JSON.parse(str) : {};
    }
  },
  components: {},
  destroyed() {
    if (document.getElementById("app-list-fixed")) {
      document.body.removeChild(document.getElementById("app-list-fixed"));
    }
  },
  beforeRouteLeave(to, from, next) {
    if (document.getElementById("app-list-fixed")) {
      document.body.removeChild(document.getElementById("app-list-fixed"));
    }
    next();
  },
  methods: {
    getIndexImg(index) {
      return require(`assets/imgs/questionnaire/${index}@2x.png`);
    },
    initUI(currentIndex) {
      if (this.tableData !== null && typeof currentIndex !== "number") {
        this.handleTableData(this.tableData);
        return;
      }
      console.log(currentIndex);
      responsePost[currentIndex]({
        searchCount: true,
        pageNo: 1,
        pageSize: this.pageSize,
        sort: [],
        orderField: [],
        condition: {
          examId:  this.examId || ""
        }
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records.map((item, index) => {
            return { ...item, index: index + 1 };
          });
          this.handleTableData(this.tableData);
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    handleTableData(tableData) {
      if (this.listOptions.showFixed) {
        this.rankUserInfo = tableData.filter(
          (item, index) => +item.mpUserId == +this.userInfo.mpUserId
        )[0] || {
          index: "未上榜",
          avatar: this.userInfo.headimgurl,
          memberName: this.userInfo.nickname
        };
      }
      // this.$emit("get-table-data", tableData);
    }
  }
};
</script>
<style lang="scss" scoped>
.member-index-img {
  width: 30px;
  height: 30px;
}
.rank-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.app-content-wrapper {
  flex: 1;
  overflow: auto;
  padding-bottom: 0 !important;
}
.rank-wrapper {
  width: 100%;
  // opacity: 0.1;
  padding: 0 5.97% 0;
  padding-bottom: 0px !important;
}
.app-list-fixed {
  color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: no-wrap;
  padding: 15px 5.97% !important;
  background-color: #1c2d55;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  .menber-avatar {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .member-ser {
    font-size: 18px;
    width: 10%;
  }
  .member-name {
    font-size: 14px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .member-recordIndex {
    width: 30%;
    font-size: 18px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.app-list-item:not(:last-child) {
  border-bottom: 1px dashed #233d7b;
}
.app-list-item {
  color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: no-wrap;
  padding: 15px 0;
  .menber-avatar {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .member-ser {
    font-size: 18px;
    width: 10%;
  }
  .member-name {
    font-size: 14px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .member-recordIndex {
    width: 30%;
    font-size: 18px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
