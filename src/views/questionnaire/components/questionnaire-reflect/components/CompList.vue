<template>
    <ul class="app-content-wrapper mt-10" v-if="tableData.length" style="padding-bottom:0px">
      <li
        class="app-list-item mb-10"
        v-for="(item, index, key) in tableData"
        :key="key"
      >
        <div class="member-name">
          <div class="p1">{{ item.isWithdraw | filterIsWithdraw(item.redpackType) }}</div>
          <div class="p2">{{ item.beginTime }}</div>
        </div>
        <div class="member-recordIndex">
          {{ item.isWithdraw ? "-" : "+"
          }}{{ item.redpackAmount | filterMoneyValue(2, 2, 0) }}
        </div>
      </li>
    </ul>
    <div style = "text-align:center" v-else >
      暂无红包领取信息～
    </div>
</template>

<script>
import { getRedpackRecord } from "@/api/questionnaire/api-questionnaire";
export default {
  inject: ["getTableData"],
  computed: {
    tableData() {
      return this.getTableData();
    }
  },
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {
      // getRedpackRecord({
      //   examId: localStorage.getItem("examId")
      // }).then(res => {
      //   if (res.code === 200) {
      //     this.tableData = res.data.withdrawList;
      //   } else {
      //     this.$toast.fail(res.message);
      //   }
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-list-item:not(:last-child) {
  padding-bottom: 4%;
  border-bottom: 1px dashed #233d7b;
}
.app-list-item {
  color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: no-wrap;
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

  .member-name {
    font-size: 14px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    .p1 {
      font-size: 14px;
    }
    .p2 {
      font-size: 12px;
      margin-top: 3%;
    }
  }
  .member-recordIndex {
    font-size: 18px;
    margin-left: 10px;
  }
}
</style>
