<template>
  <div class="animated fadeIn backyard-document-read-frame">
    <div class="row">
      <div class=" col-sm-3">
        <IndexFrame :document="document"/>
      </div>
      <div class=" col-sm-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>

  import Article from '../../common/model/article/Article'
  import LoadingFrame from '../widget/LoadingFrame.vue'
  import {SortDirection} from "../../common/model/base/SortDirection";
  import IndexFrame from "./widget/read/IndexFrame"

  export default {
    data() {
      return {
        SortDirection,
        showOutline: false,
        breadcrumbs: this.$store.state.breadcrumbs,
        user: this.$store.state.user,
        document: new Article()
      }
    },
    components: {
      LoadingFrame,
      IndexFrame
    },
    computed: {},
    watch: {},
    methods: {},
    mounted: function () {
      let that = this
      this.document.uuid = this.$store.state.route.params.documentUuid
      if (this.document.uuid) {
        this.document.httpDetail()
      }
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/global/variables";

  .backyard-document-read-frame {

  }
</style>
