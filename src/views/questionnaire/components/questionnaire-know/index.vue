<template>
  <div class="app-content-wrapper1 app-content-wrapper">
    <div class="app-content-rules padding25">
      <div class="rules-content">
        <div class="rules-fixed"></div>
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../css/rules-and-price1.scss";
dd {
  text-indent: 2em;
}
</style>
<script>
import { getRulesText } from "@/api/questionnaire/api-questionnaire";
export default {
  props: {
    routeParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {},
  components: {},
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {
      getRulesText({
        id: "c67bea0c1bce42b08e937ac9df105c25"
      }).then(res => {
        this.content = res.data.content;
      });
    }
  }
};
</script>
