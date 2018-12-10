<template>
	<div class="backyard-user-detail animated fadeIn ">
		<div class="row">

			<div class="col-md-12">
				<div class="operation text-right">
					<button class="btn btn-sm btn-primary" v-if="currentUser.uuid === user.uuid && !currentUser.emailValidate" @click.stop.prevent="currentUser.httpConfirmEmail">
						验证邮箱
					</button>
					<button class="btn btn-sm btn-primary" v-if="user.hasPermission(FeatureType.USER_MANAGE)"
					        @click.stop.prevent="resetPwd">重置密码
					</button>
					<router-link class="btn btn-sm btn-primary" v-if="currentUser.uuid === user.uuid"
					             :to="'/by/user/change/password'">
						修改密码
					</router-link>
					<router-link class="btn btn-sm btn-primary" :to="'/by/user/edit/'+currentUser.uuid">
						编辑
					</router-link>
				</div>
			</div>

			<div class="col-md-12 mt10">
				<div class="user-detail">
					<div class="row">

						<div class="col-md-4">
							<div class="p15">
								<div v-if="currentUser.uuid">
									<UserAchievement :user="currentUser"/>
								</div>
								<div class="mt20 mb15">
									TA的文章分类
								</div>
								<div>
									<span v-for="tag in tagPager.data">
										<TagCell :tag="tag" size="lg" :active="(tagUuid === tag.uuid)"/>
									</span>
								</div>
								<div class="mt20">
									TA的热门文章
								</div>
								<div>
									<ArticleHot :articles="hotArticlePager.data"/>
								</div>
							</div>
						</div>

						<div class="col-md-8">
							<div v-for="article in articlePager.data">
								<ArticleCell :article="article" :showUser="false" :activeTagUuid="tagUuid" articleInfoPosition="bottom"/>
							</div>
							<div>
								<NbPager :pager="articlePager" :callback="articleRefresh"/>
							</div>
						</div>

					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
  import UserAchievement from '../user/widget/UserAchievement'
  import TagCell from '../tag/widget/TagCell'
  import ArticleHot from '../article/widget/ArticleHot'
  import ArticleCell from '../article/widget/ArticleCell'
  import NbPager from '../../common/widget/NbPager'
  import User from '../../common/model/user/User'
  import { MessageBox, Notification } from 'element-ui'
  import { FeatureType } from '../../common/model/core/FeatureType'
  import Pager from '../../common/model/base/Pager'
  import Article from '../../common/model/article/Article'
  import Tag from '../../common/model/tag/Tag'

  export default {
    name: 'detail',
    data () {
      return {
        FeatureType,
        tagUuid: null,
        user: this.$store.state.user,
        breadcrumbs: this.$store.state.breadcrumbs,
        currentUser: new User(),
        tagPager: new Pager(Tag),
        hotArticlePager: new Pager(Article),
        articlePager: new Pager(Article)
      }
    },
    components: {
      UserAchievement,
      TagCell,
      ArticleHot,
      ArticleCell,
      NbPager
    },
    watch: {
      '$store.state.route.query.tagUuid'(newVal,oldVal){
        this.tagUuid = newVal
	      this.articlePager.page = 0
	      this.articleRefresh()
      }
    },
    methods: {
      refresh () {
        let that = this
        this.currentUser.uuid = this.$store.state.route.params.uuid
        if (this.currentUser.uuid) {
          this.currentUser.httpDetail()
        }
      },
	    hotArticleInit(){
        this.hotArticlePager.setFilterValue('userUuid', this.currentUser.uuid)
        this.hotArticlePager.httpFastPage()
	    },
      tagRefresh () {
        this.tagPager.setFilterValue('userUuid', this.currentUser.uuid)
        this.tagPager.httpFastPage()
      },
      articleRefresh () {
        this.articlePager.setFilterValue('userUuid', this.currentUser.uuid)
        this.articlePager.setFilterValue('tag', this.tagUuid)
        this.articlePager.httpFastPage()
      },

      resetPwd () {
        let that = this
        MessageBox.prompt('输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '新密码必填'
        }).then(({value}) => {
          that.currentUser.httpUserResetPassword(value, function (response) {
            Notification.success({
              message: '重置密码成功！'
            })
          })
        }).catch(() => {
        })
      }
    },
    created(){
      if(!this.user.hasPermission(FeatureType.USER_MANAGE)){
        this.breadcrumbs.splice(0, this.breadcrumbs.length)
        this.breadcrumbs.push({
          name: 'UserDetail',
          title: '用户详情'
        })
      }
    },
    mounted () {
      this.articlePager.enableHistory()
      if (this.$store.state.route.query.tagUuid) {
        this.tagUuid = this.$store.state.route.query.tagUuid
      }

      this.refresh()
	    this.hotArticleInit()
	    this.tagRefresh()
      this.articleRefresh()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.backyard-user-detail {
		.user-detail {
			background: white;
			padding: 20px;
			border-radius: 4px;
		}
	}
</style>
