<template>
	<div class="comment-text-area">
		<textarea class="comment-text" placeholder="你的评论..." v-model="comment.content"></textarea>
		<div class="comment-plugin mt5 text-right">
			<button class="btn btn-primary btn-sm" @click.stop.prevent="createComment">发送</button>
		</div>
	</div>
</template>

<script>
  import { Message } from 'element-ui'
  import Comment from '../../../common/model/comment/Comment'

  export default {
    name: 'comment-textarea',
	  data(){
      return{
        user: this.$store.state.user
      }
	  },
	  props:{
      comment:{
        type: Comment,
	      required: true
      }
	  },
	  methods:{
      createComment(){
        let that = this
	      if(!this.comment.content){
          Message.error('评论内容不能为空')
	      }else{
          this.comment.name = this.user.username
		      this.comment.email = this.user.email
          this.comment.httpCreate(function (response) {
	          that.$emit('success')
          })
	      }
      }
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.comment-text-area{
		.comment-text {
			padding: 10px 15px;
			width: 100%;
			height: 80px;
			font-size: 13px;
			border: 1px solid #dcdcdc;
			border-radius: 5px;
			background-color: hsla(0, 0%, 71%, .1);
			resize: none;
			display: inline-block;
			vertical-align: top;
			outline-style: none;
		}
	}

</style>