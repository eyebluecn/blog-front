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
			<div class="col-md-12">
				<LoadingFrame :loading="article.detailLoading">
					<div class="row">
						<div class="col-md-12">
							标题：{{article.title}}
							摘要：{{article.digest}}
							作者：{{article.author}}
							发布日期：{{article.releaseTime | simpleDateTime}}
						</div>
						<div class="col-md-12">
							<div v-html="article.content"></div>
						</div>
					</div>
				</LoadingFrame>
			</div>

		</div>

	</div>
</template>
<script>
  import { MessageBox, Notification as NotificationBox } from 'element-ui'
  import Article from '../../common/model/article/Article'
  import NbSlidePanel from '../../common/widget/NbSlidePanel.vue'
  import NbExpanding from '../../common/widget/NbExpanding.vue'
  import NbBtnDropdown from '../../common/widget/NbBtnDropdown.vue'
  import LoadingFrame from '../widget/LoadingFrame'
  import CreateSaveButton from '../widget/CreateSaveButton.vue'

  export default {

    data () {
      return {
        user: this.$store.state.user,
        article: new Article()
      }
    },
    components: {
      LoadingFrame
    },
    computed: {},
    methods: {
      fetchDetail () {
        let that = this
        this.article.uuid = this.$store.state.route.params.uuid
        if (this.article.uuid) {
          this.article.httpDetail()
        }
      }
    },
    mounted () {
      this.fetchDetail()
    }
  }
</script>
