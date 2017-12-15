<template>
	<div class="animated fadeIn">
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
			<div class="col-md-12">
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
						</div>

						<div class="col-md-6">
							<div class="row" v-validator="article.validatorSchema.tags.error">
								<label class="col-md-12 control-label mt5 compulsory">标签</label>
								<div class="col-md-12 validate">
									<input type="text" class="form-control" v-model="article.tags">
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="row">
								<label class="col-md-12 control-label mt5">摘要</label>
								<div class="col-md-12">
									<NbTags :Clazz="ArticleTag" :tags="shortTags" :max="5" :taggable="false"
									        :initFilter="{'orderSort':'DESC'}"/>
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
						</div>

						<div class="col-md-3">
							<div class="row">
								<label class="col-md-12 control-label mt5">发布日期</label>
								<div class="col-md-12">
									<DatePicker
										v-model="article.releaseTime" type="datetime" placeholder="发布日期" :picker-options="releaseDateOptions">
									</DatePicker>
								</div>
							</div>
						</div>

						<div class="col-md-3">
							<div class="row">
								<label class="col-md-12 control-label mt5">私有文章</label>
								<div class="col-md-12">
									<NbSwitcher v-model="article.privacy" type="primary"></NbSwitcher>
								</div>
							</div>
						</div>

						<div class="col-md-3">
							<div class="row">
								<label class="col-md-12 control-label mt5">置顶</label>
								<div class="col-md-12">
									<NbSwitcher v-model="article.top" type="primary"></NbSwitcher>
								</div>
							</div>
						</div>

						<div class="col-md-3">
							<div class="row">
								<label class="col-md-12 control-label mt5">Markdown格式</label>
								<div class="col-md-12 ">
									<NbSwitcher v-model="article.isMarkdown" type="primary"></NbSwitcher>
								</div>
							</div>
						</div>

					</div>

				</div>
			</NbExpanding>

			<div class="row">
				<div class="col-md-12 text-center">

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
  import NbMarkdown from '../../common/widget/markdown/NbMarkdown'
  import NbCheckbox from '../../common/widget/NbCheckbox.vue'
  import NbTank from '../../common/widget/NbTank'
  import NbSwitcher from '../../common/widget/NbSwitcher.vue'
  import NbTags from '../../common/widget/NbTags'
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
        user: this.$store.state.user,
        article: new Article(),
        releaseDateOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
          }
        }
      }
    },
    components: {
      DatePicker,
      CreateSaveButton,
      LoadingFrame,
      NbTags,
      NbMarkdown,
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
        this.article.errorMessage = null
        this.article.digest = JSON.stringify(this.shortTags)
        this.article.httpSave(function (response) {
          Notification.success({
            message: that.article.editMode ? '修改文章成功！' : '创建文章成功！'
          })

          that.$router.push('/by/article/detail/' + that.article.uuid)
        })
      },
      fetchDetail () {
        let that = this
        this.article.httpDetail()

      }
    },
    mounted () {
      let that = this
      this.article.uuid = this.$store.state.route.params.uuid
      if (this.article.uuid) {
        this.article.editMode = true
        this.fetchDetail()
      }
    }
  }


</script>
