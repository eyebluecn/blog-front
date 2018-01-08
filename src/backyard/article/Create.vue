<template>
	<div class="animated fadeIn backyard-article-create">
		<div class="row">
			<div class="col-md-12">
				<div class="pedia-navigation">
					<span class="item active">
						<span v-show="!article.editMode">新建文章</span>
						<span v-show="article.editMode">编辑文章</span>
					</span>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12 text-right">
				<button class="btn btn-sm btn-primary mr5" @click.stop.prevent="showOutline = !showOutline">
					<span v-show="!showOutline">
						展开基本信息
					</span>
					<span v-show="showOutline">
						收起基本信息
					</span>
				</button>
				<CreateSaveButton :entity="article" :callback="save"/>
			</div>
		</div>


		<LoadingFrame :loading="article.detailLoading">
			<NbExpanding>
				<div class="bg-white br4 p20 mt10" v-show="showOutline">
					<div class="row">

						<div class="col-md-6">

							<div class="row" v-validator="article.validatorSchema.title.error">
								<label class="col-md-12 control-label mt5 compulsory">文章名称</label>
								<div class="col-md-12 validate">
									<input type="text" class="form-control" v-model="article.title">
								</div>
							</div>

							<div class="row">
								<label class="col-md-12 control-label mt5">摘要</label>
								<div class="col-md-12">
									<input type="text" class="form-control" v-model="article.digest">
								</div>
							</div>

							<div class="row">
								<label class="col-md-12 control-label mt5">标签</label>
								<div class="col-md-12">
									<NbTags v-if="article.editMode && article.userUuid" :Clazz="ArticleTag" :tags="shortTags" :max="5"
									        :taggable="false"
									        :initFilter="{'orderSort':'DESC','userUuid': article.userUuid}"/>
									<NbTags v-if="!article.editMode" :Clazz="ArticleTag" :tags="shortTags" :max="5" :taggable="false"
									        :initFilter="{'orderSort':'DESC','userUuid': user.uuid}"/>
								</div>
							</div>

						</div>

						<div class="col-md-6">

							<div class="row">
								<label class="col-md-12 control-label mt5">封面图片</label>
								<div class="col-md-12">
									<NbTank :tank="article.posterTank"/>
								</div>
							</div>

							<div class="row">
								<div class="col-md-6">
									<div class="row">
										<label class="col-md-12 control-label mt5">私有文章</label>
										<div class="col-md-12">
											<NbSwitcher v-model="article.privacy" type="primary"></NbSwitcher>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="row">
										<label class="col-md-12 control-label mt5">置顶</label>
										<div class="col-md-12">
											<NbSwitcher v-model="article.top" type="primary"></NbSwitcher>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="row">
										<label class="col-md-12 control-label mt5">接受评论通知</label>
										<div class="col-md-12">
											<NbSwitcher v-model="article.needNotify" type="primary"></NbSwitcher>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="row" v-if="!article.editMode">
										<label class="col-md-12 control-label mt5">Markdown格式</label>
										<div class="col-md-12 ">
											<NbSwitcher v-model="article.isMarkdown" type="primary"></NbSwitcher>
										</div>
									</div>
								</div>
							</div>

						</div>

					</div>

				</div>
			</NbExpanding>


			<div class="row">
				<div class="col-md-12 mt10" v-if="!article.isMarkdown">
					<NbEditor v-model="nbEditorContent"/>
				</div>
				<div class="col-md-12 mt10" v-if="article.isMarkdown">
					<NbMarkdown v-model="nbMarkdownContent" v-on:htmlChange="nbHtmlContent = $event"/>
				</div>
			</div>


		</LoadingFrame>
	</div>
</template>
<script>

  import { simpleDateTime, str2Date } from '../../common/filter/time'
  import { Notification, MessageBox, DatePicker } from 'element-ui'
  import Article from '../../common/model/article/Article'
  import NbSlidePanel from '../../common/widget/NbSlidePanel.vue'
  import NbEditor from '../../common/widget/NbEditor.vue'
  import NbMarkdown from '../../common/widget/markdown/NbMarkdown'
  import NbCheckbox from '../../common/widget/NbCheckbox.vue'
  import NbTank from '../../common/widget/NbTank'
  import NbSwitcher from '../../common/widget/NbSwitcher.vue'
  import NbTags from '../../common/widget/NbTags'
  import NbExpanding from '../../common/widget/NbExpanding'
  import CreateSaveButton from '../widget/CreateSaveButton.vue'
  import LoadingFrame from '../widget/LoadingFrame.vue'
  import ArticleTag from '../../common/model/tag/Tag'
  import $ from 'jquery'

  export default {

    data () {
      return {
        ArticleTag,
        shortTags: [],
        showOutline: true,
        nbEditorContent: null,
        nbMarkdownContent: null,
        nbHtmlContent: null,
        user: this.$store.state.user,
        article: new Article(),
        localStorageStatus: 1,  // 0 表示清空localStorage，表示创建成功后清空localStorage； 1 表示存储localStorage，表示创建时未保存即离开；
        articleWords: null    //文章
      }
    },
    components: {
      DatePicker,
      CreateSaveButton,
      LoadingFrame,
      NbTags,
      NbEditor,
      NbMarkdown,
      NbExpanding,
      NbCheckbox,
      NbSlidePanel,
      NbSwitcher,
      NbTank
    },
    computed: {},
    watch: {},
    methods: {

      save () {
        let that = this
        let tagsUuidArr = []
        this.article.errorMessage = null
        this.shortTags.forEach(function (i, index) {
          tagsUuidArr.push(i.uuid)
        })
        this.article.tags = JSON.stringify(tagsUuidArr)
        if (this.article.isMarkdown) {
          this.article.markdown = this.nbMarkdownContent
          this.article.html = this.nbHtmlContent
          let editormdMarkdownTextarea = $('.editormd-markdown-textarea')
          if (editormdMarkdownTextarea) {
            this.articleWords = editormdMarkdownTextarea.val()
          }
        } else {
          this.article.html = this.nbEditorContent
          let wangEditorTxt = $('.wangEditor-txt')
          if (wangEditorTxt) {
            this.articleWords = wangEditorTxt.text()
          }
        }

        //统计字数
        this.article.words = this.articleWords.length
        //如果没用填摘要，默认选择文章的前二百字
        if (!this.article.digest) {
          let articleContent = this.article.html.replace(/<.+?>/g, '')
          this.article.digest = articleContent.slice(0, 200)
        }

        if (!this.article.validate()) {
          this.showOutline = true
          return
        }
        this.article.httpSave(function (response) {
          Notification.success({
            message: that.article.editMode ? '修改文章成功！' : '创建文章成功！'
          })
          that.localStorageStatus = 0
          that.$router.push('/by/article/detail/' + that.article.uuid)
        })
      },
      fetchDetail () {
        if (this.article.isMarkdown) {
          this.nbMarkdownContent = this.article.markdown
          this.nbHtmlContent = this.article.html
        } else {
          this.nbEditorContent = this.article.html
        }
        if (this.article.tags) {
          this.shortTags = this.article.tagArray
        }

      }
    },
    mounted () {
      let that = this
      this.article.uuid = this.$store.state.route.params.uuid
      if (this.article.uuid) {
        this.article.editMode = true
        this.article.httpDetail(this.fetchDetail)
      } else {
        if (window.localStorage.getItem('blogArticle')) {
          this.article.render(JSON.parse(window.localStorage.getItem('blogArticle')))
          this.fetchDetail()
        }

      }
    },
    beforeRouteLeave (to, from, next) {
      if (from.name === 'ArticleCreate') {
        if (this.localStorageStatus) {
          this.article.tags = JSON.stringify(this.shortTags)
          if (this.article.isMarkdown) {
            this.article.markdown = this.nbMarkdownContent
            this.article.html = this.nbHtmlContent
          } else {
            this.article.html = this.nbEditorContent
          }
          window.localStorage.setItem('blogArticle', JSON.stringify(this.article))
        } else {
          window.localStorage.removeItem('blogArticle')
        }

      }
      next(true)
    }
  }


</script>
<style lang="less" rel="stylesheet/less">
	@import "../../assets/css/global/variables";

	.backyard-article-create {
		.pack-up {
			color: @brand-primary;
			border-radius: 0 0 5px 5px;
			border-left: 1px solid @brand-primary;
			border-right: 1px solid @brand-primary;
			border-bottom: 1px solid @brand-primary;
		}
	}
</style>
