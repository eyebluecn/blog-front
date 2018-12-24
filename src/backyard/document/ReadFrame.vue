<template>
  <div class="animated fadeIn backyard-document-read-frame">
    <div class="index-box">
      <IndexFrame :document="document"/>
    </div>
    <div class="article-box">
      <router-view></router-view>
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
    watch: {
      "$store.state.route.params.documentUuid"() {
        this.refresh()
      }
    },
    methods: {
      refresh() {
        let that = this
        this.document.uuid = this.$store.state.route.params.documentUuid
        if (this.document.uuid) {
          this.document.httpDetail()
        }
      }

    },
    mounted: function () {
      this.refresh()
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/global/variables";

  .backyard-document-read-frame {
    height: 100%;

    padding: 0 !important;
    flex-direction: row;
    display: flex;

    .index-box {
      height: 100%;
      width: 240px;
      background-color: #fafafa;

      border-right: 1px solid #eee;
      overflow: hidden;
    }
    .article-box {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 10px;
      background-color: white;
    }

  }
</style>
