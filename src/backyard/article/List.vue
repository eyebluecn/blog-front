<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
          <span class="item active">文章列表</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <NbFilter :pager="pager" :callback="search">
          <router-link class="btn btn-primary btn-sm" to="/by/article/create">
            <i class="fa fa-plus"></i>
            创建文章
          </router-link>
        </NbFilter>
      </div>

      <div class="col-md-12" v-for="(article,index) in pager.data">

        <div class="bg-white border br4 p10 mb10">
          <div class="cell-title cursor" @click.prevent.stop="$router.push('/by/article/detail/'+article.uuid)">
            {{article.title}}
          </div>
          <div class="cell-content">
            {{article.digest}}
          </div>
          <div class="cell-description">
            作者：{{article.author}} 点击量：{{article.hit}} 发布时间：{{article.releaseTime | simpleDateTime}}
          </div>

        </div>
      </div>


      <div class="col-md-12 mt20">
        <NbPager :pager="pager" :callback="refresh"/>
      </div>

    </div>

  </div>
</template>
<script>
  import NbFilter from '../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'
  import Pager from "../../common/model/base/Pager"
  import Article from "../../common/model/article/Article"

  export default {
    data() {
      return {
        pager: new Pager(Article),
        user: this.$store.state.user
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {
      '$route'(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.reset();
          this.refresh();
        }
      }
    },
    methods: {
      reset() {
        this.pager.page = 0;
        this.pager.resetFilter();
        this.pager.enableHistory();
      },
      search() {
        this.pager.page = 0;
        this.refresh()
      },
      refresh() {


        this.pager.httpFastPage();
      }
    },
    mounted() {
      this.pager.enableHistory();
      //默认按照sort倒序排列。
      if (this.pager.getFilter("orderReleaseTime").isEmpty()) {
        this.pager.setFilterValue("orderReleaseTime", "DESC");
      }


      this.refresh();
    }
  }
</script>
