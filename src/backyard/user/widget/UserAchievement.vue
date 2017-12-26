<template>
	<div class="user-achievement">

		<div class="text-center">
			<div>
				<a target="_blank" :href="user.getAvatarUrl()">
					<img class="img-circle w100 h100" :src="user.getAvatarUrl()" alt="">
				</a>
			</div>
			<div class="f18 bold mv15">
				{{user.username}}
			</div>
		</div>
		<div>
			<div class="achievement-cell">
				<i class="fa fa-pencil-square"></i>
				<span>撰写了 {{user.articleNum}} 篇文章</span>
			</div>

			<div class="achievement-cell">
				<i class="fa fa-font"></i>
				<span>总共有 {{user.articleWords}} 字</span>
			</div>

			<div class="achievement-cell">
				<i class="fa fa-book"></i>
				<span>被阅读 {{user.articleHit}} 次</span>
			</div>

			<div class="achievement-cell">
				<i class="fa fa-thumbs-o-up"></i>
				<span>获得了 {{user.articleAgreeNum}} 次赞</span>
			</div>

			<div class="achievement-cell">
				<i class="fa fa-commenting-o"></i>
				<span>共收到 {{user.commentNum}} 条评论</span>
			</div>
		</div>

	</div>
</template>

<script>
  import User from '../../../common/model/user/User'

  export default {
    name: 'user-achievement',
	  data(){
      return{

      }
	  },
	  props:{
      user: {
        type: User,
	      required: true
      }
	  },
	  mounted(){

	  }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.user-achievement{
		.achievement-cell {
			margin: 5px 0;
			i {
				width: 20px;
				font-size: 18px;
				color: #bdcadb;
			}
			span {
				color: #555;
				margin-left: 10px;
				font-size: 16px;
			}

		}
	}
</style>