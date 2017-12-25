<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">

        <div class="pedia-navigation">
          <span class="item active">文章详情</span>
        </div>

      </div>
    </div>

    <!--编辑，权限设置-->
    <div class="text-right mb10">
      <router-link class="btn btn-primary btn-sm" :to="'/by/article/edit/'+ article.uuid">
        <i class="fa fa-pencil"></i>
        编辑文章
      </router-link>
    </div>

    <div class="row">
      <div class="col-md-8 col-md-offset-2 article-detail">
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <LoadingFrame :loading="article.detailLoading">

              <div class="article-title">
                {{article.title}}
              </div>

              <ArticleInfo :article="article" :showUser="true"/>

              <div v-if="article.html">
                <NbMarkdownPreview :html="article.html"/>
              </div>

              <div class="mt20">
                <i class="fa fa-tags"></i>本文分类：
                <span v-for="(tag,index) in article.tagArray">
                  <Tag :tag="tag" />
                </span>
              </div>

              <div class="mt100">
                <CommentList></CommentList>
              </div>

            </LoadingFrame>
          </div>
        </div>


      </div>

    </div>


  </div>
</template>
<script>
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import Article from '../../common/model/article/Article'
  import NbSlidePanel from '../../common/widget/NbSlidePanel.vue'
  import NbExpanding from '../../common/widget/NbExpanding.vue'
  import NbBtnDropdown from '../../common/widget/NbBtnDropdown.vue'
  import ArticleInfo from './widget/ArticleInfo'
  import LoadingFrame from '../widget/LoadingFrame'
  import CreateSaveButton from '../widget/CreateSaveButton.vue'
  import NbMarkdownPreview from '../../common/widget/markdown/NbMarkdownPreview'
  import Tag from '../tag/widget/Tag'
  import CommentList from '../comment/List'

  export default {

    data() {
      return {
        user: this.$store.state.user,
        tags: [],
        article: new Article()
      }
    },
    components: {
      LoadingFrame,
      NbMarkdownPreview,
      CommentList,
      ArticleInfo,
      Tag
    },
    computed: {},
    methods: {
      fetchDetail() {
        let that = this
        this.article.uuid = this.$store.state.route.params.uuid
        if (this.article.uuid) {
          this.article.httpDetail()
        }
      }
    },
    mounted() {
      this.fetchDetail()
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .article-detail{
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
</style>