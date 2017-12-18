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
			<div class="col-md-10 col-md-offset-1 bg-white">
				<LoadingFrame :loading="article.detailLoading">
					<div class="row">
						<div class="col-md-8 col-md-offset-2 ">
							<h1 class="text-center">{{article.title}}</h1>
							<div class="text-center">
								<span class="label label-primary mr5" v-for="item in JSON.parse(article.tags)">
									{{item}}
								</span>
								<p class="mt10">{{article.releaseTime | simpleDateTime}}</p>
							</div>
							<div class="">
								<img :src="article.posterUrl" alt="">
							</div>
							<div class="">
								<div v-html="article.html"></div>
							</div>
						</div>

						<div class="col-md-8 col-md-offset-2 mt100">
							<CommentList></CommentList>
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
	import CommentList from '../comment/List'
  export default {

    data () {
      return {
        user: this.$store.state.user,
	      tags:[],
        article: new Article()
      }
    },
    components: {
      LoadingFrame,
      CommentList
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
