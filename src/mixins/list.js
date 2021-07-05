// table列表请求相关
export const listMixin = {
  components: {},
  data() {
    return {
      // 分页请求
      pageRequest: {
        pageNo: 0,
        pageSize: 20,
        sort: [],
        orderField: [],
        condition: {}
      },
      error: false,
      list: [],
      sort: [],
      orderField: [],
      condition: {},
      totalPage: 0, // 总条数
      loading: false,
      title: document.title,
      finished: false,
      resData: {}
    }
  },
  created() {
    this.initCondition()
  },
  watch: {},
  computed: {},
  mounted() {
    console.log('mi mounted');
  },
  methods: {
    initCondition() {
      let pageRequest = this.pageRequest
      pageRequest.sort = this.sort
      pageRequest.orderField = this.orderField
      pageRequest.condition = this.condition
      this.pageRequest = pageRequest
    },
    // 请求前做一些数据处理
    beforeInitTable() {
      return true
    },
    // 渲染表格前要做的数据处理
    beforeRenderTable() {
      return true
    },
    async doGetList() {
      if (!await this.beforeInitTable()) {
        return false
      }
      let pageRequest = this.pageRequest
      pageRequest.pageNo = pageRequest.pageNo + 1;
      // 异步更新数据
      setTimeout(() => {
        this.ListApi(pageRequest).then(res => {
          let _res = res.data;
          if (res.success) {
            if (!this.beforeRenderTable(res.data)) {
              this.list = this.resData.data.records ? this.list.concat(this.resData.data.records) : [];
            } else {
              this.list = this.list.concat(_res.records);
            }
            // 加载状态结束
            this.loading = false;
            this.totalPage = _res.total;
            // this.list = this.list.concat(_res.records);
            // 数据全部加载完成
            if (this.list.length >= this.totalPage) {
              this.finished = true;
            }
          } else {
            this.$toast.fail(res.message);
          }
        });
      }, 500);
    },
    afterRenderTable() {
      return true
    },
    // 下拉刷新，
    fnReload() {
      this.pageRequest.pageNo = 0
      // 清空列表数据
      this.finished = false;
      this.loading = true;
      this.list = []
      this.onLoad()
    },
    beforeFnSearchReset() {
      return true
    }
  }
}
