<template>
	<div class="article-info">
		<div v-if="showUser">
			<div class="pull-left mr10">
				<router-link :to="'/by/user/detail/' + article.user.uuid">
					<img class="img-circle w40 h40" :src="article.user.getAvatarUrl()"/>
				</router-link>
			</div>
			<div>
				<div class="f16">
					<router-link :to="'/by/user/detail/'+article.user.uuid">
						{{article.user.username}}
					</router-link>
				</div>
				<div class="mix">
          <span class="mr10">
            {{article.createTime | simpleDateHourMinute}}
          </span>
					<span class="mr10">
            字数 {{article.words}}
          </span>
					<span class="mr10">
            阅读 {{article.hit}}
          </span>
					<span class="mr10">
            评论 {{article.commentNum}}
          </span>
					<span class="mr10">
            点赞 {{article.agree}}
          </span>

					<span v-if="showOperate" class="pull-right action-buttons">
						<router-link :to="'/by/article/edit/'+article.uuid">
								<i class="fa fa-pencil text-info f18"></i>
						</router-link>
						<a href="javascript:void(0)" title="删除" @click.stop.prevent="article.confirmDel(delCallback)">
								<i class="fa fa-trash text-danger f18"></i>
            </a>
					</span>
				</div>
			</div>
		</div>
		<div v-else>
			<div>
          <span class="mr10">
            {{article.createTime | simpleDateHourMinute}}
          </span>
					<span class="mr10">
            字数 {{article.words}}
          </span>
					<span class="mr10">
            阅读 {{article.hit}}
          </span>
					<span class="mr10">
            评论 {{article.commentNum}}
          </span>
					<span class="mr10">
            点赞 {{article.agree}}
          </span>
			</div>
		</div>
	</div>
</template>

<script>
  import Article from '../../../common/model/article/Article'

  export default {
    name: 'article-info',
	  data(){
      return{

      }
	  },
	  props:{
      article:{
        type:Article,
        required: true
      },
		  showUser: {
        type: Boolean,
			  required: false,
			  default: true
		  },
		  showOperate: {
        type: Boolean,
			  required: false,
			  default: false
		  },
      delCallback: {
        type: Function,
	      required: false,
	      default: function () {
		      return true
        }
      }
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.article-info{

	}
</style>