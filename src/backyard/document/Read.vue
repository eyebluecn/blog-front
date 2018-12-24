<template>
  <div class="animated fadeIn backyard-document-read">

    <LoadingFrame :loading="article.detailLoading">
      <div class="row">

        <div class="col-xs-12" v-if="article.type === ArticleType.DOCUMENT_ARTICLE">
          <div class="article-detail">
            <div class="row">
              <div class="col-md-12">

                <div class="article-title">
                  <i class="fa fa-lock" v-if="article.privacy" title="私有文章，只有自己可见"></i>
                  {{article.title}}
                </div>

                <ArticleInfo :article="article" :showUser="true"/>

                <div v-if="article.html">
                  <NbMarkdownPreview :html="article.html" @markdownComplete="markdownComplete"/>
                </div>

                <div class="mt20">
                  <i class="fa fa-tags"></i>本文分类：
                  <span v-for="(tag,index) in article.tagArray">
                  <TagCell :tag="tag"/>
                </span>
                </div>

                <div class="mt100" v-if="article.uuid" ref="commentList">
                  <CommentList :article="article" :commentUuid="commentUuid"></CommentList>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div class="col-xs-12 italic" v-if="article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE">
          《{{article.title}}》 尚未创建，
          <router-link :to="'/by/document/write/' + article.uuid">立即创建</router-link>
        </div>
      </div>
    </LoadingFrame>

  </div>
</template>
<script>

  import Article from '../../common/model/article/Article'
  import LoadingFrame from '../widget/LoadingFrame.vue'
  import {SortDirection} from "../../common/model/base/SortDirection";
  import ArticleInfo from '../article/widget/ArticleInfo'
  import NbMarkdownPreview from '../../common/widget/markdown/NbMarkdownPreview'
  import TagCell from '../tag/widget/TagCell'
  import CommentList from '../comment/widget/CommentList'
  import {ArticleType} from "../../common/model/article/ArticleType";


  export default {

    data() {
      return {
        ArticleType,
        SortDirection,
        showOutline: false,
        breadcrumbs: this.$store.state.breadcrumbs,
        user: this.$store.state.user,
        article: new Article(),
        tags: [],
        commentUuid: null
      }
    },
    components: {
      LoadingFrame,
      NbMarkdownPreview,
      CommentList,
      ArticleInfo,
      TagCell
    },
    computed: {
      commentList() {
        return this.$refs.commentList
      }
    },
    watch: {
      "$store.state.route.params.articleUuid"() {
        this.refresh()
      }
    },
    methods: {
      refresh() {
        let that = this
        this.article.uuid = this.$store.state.route.params.articleUuid
        if (this.article.uuid) {
          this.article.editMode = true
          this.article.httpDetail(function () {
            that.refineBreadcrumb()
          })
        }
      },
      refineBreadcrumb() {
        let that = this;
        //整理面包屑
        that.breadcrumbs.forEach(function (breadcrumb) {
          if (breadcrumb.name === "DocumentDetail") {
            breadcrumb.title = that.article.document.title
            breadcrumb.params.documentUuid = that.article.document.uuid
            console.log(breadcrumb)
          } else if (breadcrumb.name === "DocumentRead") {
            breadcrumb.title = that.article.title
          }
        })
      },
      markdownComplete() {
        if (this.commentUuid) {
          this.commentList.scrollIntoView()
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

  .backyard-document-read {

    .article-detail {
      background: white;
      padding: 20px;
      border-radius: 4px;
      .article-title {
        word-break: break-all;
        margin: 20px 0;
        font-size: 28px;
        color: black;
        font-weight: 700;
        line-height: 1.3;
      }

      .article-info {
        border-top: 1px solid #eeeeee;
        padding-top: 20px;
        .author {
          a {
            font-size: 20px;
            color: #555;
            &:hover {
              color: #000;
              text-decoration: underline;
            }
          }

        }
        .mix {
        }
      }
    }

  }
</style>
