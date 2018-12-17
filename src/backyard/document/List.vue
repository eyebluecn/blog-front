<template>
  <div class="animated fadeIn backyard-article-list">

    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
          <span class="item active">文章列表</span>
          <span class="tool">
            <router-link class="btn btn-primary btn-sm" to="/by/document/create">
              <i class="fa fa-plus"></i>
              创建文档
            </router-link>
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <NbPlainFilter :filters="pager.filters" :callback="search"/>
      </div>

      <div class="col-xs-12" v-for="(article,index) in pager.data">
        <ArticleCell :article="article" :showUser="true" :showOperate="true" :delCallback="refresh"/>
      </div>

      <div class="col-xs-12">
        <NbPager :pager="pager" :callback="refresh"/>
      </div>

    </div>

  </div>
</template>
<script>
  import NbPlainFilter from '../../common/widget/filter/NbPlainFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import ArticleCell from '../../backyard/article/widget/ArticleCell'
  import Pager from '../../common/model/base/Pager'
  import Article from '../../common/model/article/Article'
  import {UserRole} from "../../common/model/user/UserRole";
  import {SortDirection} from "../../common/model/base/SortDirection";
  import {ArticleType} from "../../common/model/article/ArticleType";

  export default {
    data() {
      return {
        ArticleType,
        pager: new Pager(Article),
        user: this.$store.state.user
      }
    },
    components: {
      ArticleCell,
      NbPlainFilter,
      NbPager
    },
    computed: {},
    watch: {
      '$route'(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.reset()
          this.refresh()
        }
      }
    },
    methods: {
      reset() {
        this.pager.page = 0
        this.pager.resetFilter()
        this.pager.enableHistory()
      },
      search() {
        this.pager.page = 0
        this.refresh()
      },
      refresh() {
        this.pager.httpFastPage()
      }
    },
    created() {
      /*初始化Filter inputSelection*/
      if (this.user.role === UserRole.ADMIN) {
        this.pager.getFilter('userUuid').visible = true
      } else {
        this.pager.setFilterValue('userUuid', this.user.uuid)
      }
    },
    mounted() {
      this.pager.enableHistory()
      //默认按照置顶倒序排列。
      if (this.pager.getFilter('orderTop').isEmpty()) {
        this.pager.setFilterValue('orderTop', SortDirection.DESC)
      }
      //默认按照sort倒序排列。
      if (this.pager.getFilter('orderCreateTime').isEmpty()) {
        this.pager.setFilterValue('orderCreateTime', SortDirection.DESC)
      }


      //如果没有设置用户的话，那么默认显示当前登录用户的资料
      if (!this.pager.getFilterValue('userUuid')) {
        this.pager.setFilterValue('userUuid', this.user.uuid)
      }

      //只显示知识库
      this.pager.setFilterValue("types", ArticleType.DOCUMENT)

      this.refresh()
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .backyard-article-list {

  }
</style>
