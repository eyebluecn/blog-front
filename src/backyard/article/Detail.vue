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
		<div class="row">
			<div class="col-lg-8 col-lg-offset-2 text-right mb10">
				<router-link class="btn btn-primary btn-sm" :to="'/by/article/edit/'+ article.uuid">
					<i class="fa fa-pencil"></i>
					编辑文章
				</router-link>
			</div>
		</div>


		<LoadingFrame :loading="article.detailLoading">
			<div class="row">

				<div class="col-lg-8 col-lg-offset-2">
					<div class="article-detail">
						<div class="row">
							<div class="col-md-10 col-md-offset-1">


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

								<div class="mt100" v-if="article.uuid" ref="commentList" >
									<CommentList :article="article" :commentUuid="commentUuid"></CommentList>
								</div>

							</div>
						</div>

					</div>


				</div>

			</div>
		</LoadingFrame>

	</div>
</template>
<script>
  import { MessageBox, Notification as NotificationBox } from 'element-ui'
  import Article from '../../common/model/article/Article'
  import NbSlidePanel from '../../common/widget/NbSlidePanel.vue'
  import NbExpanding from '../../common/widget/NbExpanding.vue'
  import NbBtnDropdown from '../../common/widget/NbBtnDropdown.vue'
  import ArticleInfo from './widget/ArticleInfo'
  import LoadingFrame from '../widget/LoadingFrame'
  import CreateSaveButton from '../widget/CreateSaveButton.vue'
  import NbMarkdownPreview from '../../common/widget/markdown/NbMarkdownPreview'
  import TagCell from '../tag/widget/TagCell'
  import CommentList from '../comment/widget/CommentList'

  export default {

    data () {
      return {
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
      commentList(){
        return this.$refs.commentList
      }
    },
    methods: {
      markdownComplete(){
        if(this.commentUuid){
          this.commentList.scrollIntoView()
        }
      }
    },
    mounted () {
      let that = this
      this.article.uuid = this.$store.state.route.params.uuid
	    if(this.$store.state.route.query.commentUuid){
        this.commentUuid = this.$store.state.route.query.commentUuid
	    }
      if (this.article.uuid) {
        this.article.httpDetail()
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
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
</style>
