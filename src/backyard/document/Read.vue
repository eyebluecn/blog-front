<template>
  <div class="animated fadeIn backyard-document-read">

    文章详情：{{article.title}}
  </div>
</template>
<script>

  import Article from '../../common/model/article/Article'
  import LoadingFrame from '../widget/LoadingFrame.vue'
  import {SortDirection} from "../../common/model/base/SortDirection";

  export default {

    data() {
      return {
        SortDirection,
        showOutline: false,
        breadcrumbs: this.$store.state.breadcrumbs,
        user: this.$store.state.user,
        article: new Article()
      }
    },
    components: {
      LoadingFrame
    },
    computed: {},
    watch: {},
    methods: {
      refineBreadcrumb() {
        let that = this;
        //整理面包屑
        this.$store.state.route.params.documentUuid = that.article.document.uuid
        that.breadcrumbs.forEach(function (breadcrumb) {
          if (breadcrumb.name === "DocumentDetail") {
            breadcrumb.title = that.article.document.title
          } else if (breadcrumb.name === "DocumentRead") {
            breadcrumb.title = that.article.title
          }
        })
      }
    },
    mounted: function () {
      let that = this
      this.article.uuid = this.$store.state.route.params.articleUuid
      if (this.article.uuid) {
        this.article.editMode = true
        this.article.httpDetail(function () {
          that.refineBreadcrumb()
        })
      }
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/global/variables";

  .backyard-document-read {

    .document-write-block {

      background-color: white;
      box-shadow: 0 0 2px rgba(0, 0, 0, .2);
      border-radius: 5px;
      padding: 10px 15px 10px 15px;
      margin-bottom: 10px;

    }
  }
</style>
