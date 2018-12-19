<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeArticle" :initFilter="initFilter" :filters="filters">

			<span slot="title">
				{{activeArticle.title?activeArticle.title:"请选择文章..."}} <span class="text-danger">{{activeArticle.path}}</span>
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="article in pager.data"
           @click.stop.prevent="clickItem(article)"
           :class="{'bg-white':article.uuid !== activeArticle.uuid,'bg-azure':article.uuid === activeArticle.uuid}"
           slot="cells">

        <div class="media">

          <div class="media-body">
            <div>
              <span class="f15 bold">{{article.title}} <span class="text-danger">{{article.path}}</span></span>
            </div>
            <div class="mt5">
              <span class="mr10">{{article.createTime | simpleDateTime}}</span>
            </div>
          </div>
        </div>

      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import Pager from "../../../../common/model/base/Pager";
  import NbPagerSelection from "../../../../common/widget/NbPagerSelection";
  import {ArticleType, ArticleTypeList, ArticleTypeMap} from "../../../../common/model/article/ArticleType";
  import Article from "../../../../common/model/article/Article";
  import Filter from "../../../../common/model/base/Filter";
  import {FilterType} from "../../../../common/model/base/FilterType";

  export default {
    data() {
      return {
        ArticleType,
        ArticleTypeMap,
        ArticleTypeList,
        pager: new Pager(Article),
        filters: []
      }
    },
    props: {
      activeArticle: {
        type: Article,
        required: true
      },
      //列表的过滤条件
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {
      "activeArticle.uuid"(newVal, oldVal) {
        this.httpUpdateActiveArticle();
      }
    },
    methods: {
      clickItem(article) {

        //选择的时候只修改这些关键内容。
        this.activeArticle.render(article)

      },
      httpUpdateActiveArticle() {

        this.$emit("activeArticleChange")

        //如果传过来的activeArticle只有id没有其他内容，我们将要负责去获取其详细内容。
        if (this.activeArticle.uuid && !this.activeArticle.title) {
          this.activeArticle.httpDetail();
        }
      }
    },
    components: {
      NbPagerSelection
    },
    mounted() {

      //只允许关键词搜索
      this.filters.push(new Filter(FilterType.INPUT, '标题', 'title'))

      this.httpUpdateActiveArticle();
    }
  }
</script>
