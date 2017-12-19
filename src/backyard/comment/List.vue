<template>
	<div class="article-comment-list">
		<div>
			<h2 class="black">欢迎评论</h2>
			<div class="new-comment">
				<CommentTextarea :comment="floorComment" @success="floorCreateSuccess"></CommentTextarea>
			</div>
			<div>
				<h2 class="black">
					共{{pager.totalItems}}条评论
				</h2>
			</div>
			<div class="comment-list">
				<div>
					<div class="comment-box" v-for="commentFloor in pager.data">
						<div>
							<img class="img-circle img-sm pull-left mr10" src="../../assets/img/avatar.png" alt="">
							<div>
								<p class="mb0">
									<span>{{commentFloor.name}}</span>
								</p>
								<p class="comment-date">
									<span>{{ commentFloor.createTime | simpleDateTime}}</span>
								</p>
							</div>
							<div class="comment-text">
								{{commentFloor.content}}
							</div>
							<div class="comment-operate mt10">
								<span class="cursor" @click.stop.prevent="agreeChange(commentFloor)">
									<em class="fa fa-thumbs-o-up" v-if="!commentFloor.agreed"></em> <em class="fa fa-thumbs-up red" v-else></em> {{commentFloor.agree}}人赞过
								</span>
								<span class="cursor ml20" @click.stop.prevent="prepareReply(commentFloor)">
									<em class="fa fa-commenting-o"></em> 回复
								</span>
								<span class="cursor ml20" @click.stop.prevent="commentFloor.confirmDel(refresh)">
									<em class="fa fa-trash-o"></em> 删除
								</span>
								<span v-if="commentFloor.isReport">
									<em class="fa fa-bug red pull-right">被举报</em>
								</span>
							</div>
							<div class="sub-comment-box mt15" v-if="commentFloor.commentPager.totalItems">
								<div v-for="subComment in commentFloor.commentPager.data" class="sub-comment">
									<div class="mb10 black">
										<span>{{subComment.name}}：</span>
										<span>{{subComment.content}}</span>
									</div>
									<div>
										<span>{{subComment.createTime | simpleDateTime}}</span>
										<span class="cursor ml20" @click.stop.prevent="agreeChange(subComment)">
											<em class="fa fa-thumbs-o-up" v-if="!subComment.agreed"></em> <em class="fa fa-thumbs-up red" v-else></em> {{subComment.agree}}人赞过
										</span>
										<span class="cursor ml20" @click.stop.prevent="prepareReply(subComment)">
											<em class="fa fa-commenting-o"></em> 回复
										</span>
										<span class="cursor ml20" @click.stop.prevent="subComment.confirmDel(refresh)">
											<em class="fa fa-trash-o"></em> 删除
										</span>
										<span v-if="subComment.isReport">
											<em class="fa fa-bug red pull-right">被举报</em>
										</span>
									</div>
								</div>
								<div v-if="commentFloor.commentPager.totalItems">
									<NbPager :pager="commentFloor.commentPager" :callback="commentFloor.refreshCommentPager()"/>
								</div>
							</div>
							<NbExpanding>
								<div class="mt10" v-if="replyModel
                                        && ((repliedComment.isFloor && commentFloor.uuid === repliedComment.uuid)
                                        || (!repliedComment.isFloor && commentFloor.uuid === repliedComment.floorUuid)) ">
									<CommentTextarea :comment="replyComment" @success="replyCreateSuccess"></CommentTextarea>
								</div>
							</NbExpanding>
						</div>
					</div>
				</div>
				<div class="mv20">
					<NbPager :pager="pager" :callback="refresh"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import NbPager from '../../common/widget/NbPager.vue'
  import NbExpanding from '../../common/widget/NbExpanding'
  import Pager from '../../common/model/base/Pager'
  import Comment from '../../common/model/comment/Comment'
  import CommentTextarea from './widget/CommentTextarea'
  import { simpleDateTime } from '../../common/filter/time'
  import { Message } from 'element-ui'

  export default {
    name: 'list',
    data () {
      return {
        user: this.$store.state.user,
        articleUuid: null,
        pager: new Pager(Comment),
        floorComment: new Comment(),
        repliedComment: new Comment(),
	      replyComment: new Comment(),
        replyModel: false

      }
    },
    methods: {
      search () {
        this.pager.page = 0
        this.refresh()
      },
      refresh () {
        this.pager.setFilterValue('orderSort', 'DESC')
        this.pager.setFilterValue('isFloor', true)
        this.pager.setFilterValue('needSubPager', true)
        this.pager.httpFastPage()
      },

	    //修改用户点赞状态
	    agreeChange(comment) {
				comment.httpAgreeChange()
	    },

	    //楼层回复成功
      floorCreateSuccess() {
        Message.success('评论成功！')
	      this.refresh()
	      //清空楼层回复中的内容
	      this.floorComment.content = null
      },

      //准备回复
      prepareReply(comment){

        if(this.replyModel && comment.uuid === this.repliedComment.uuid){
          this.replyModel = false
	        return
        }
	      this.replyModel = true
	      this.repliedComment.render(comment)
        if(this.repliedComment.isFloor){
          this.replyComment.floorUuid = this.repliedComment.uuid
        } else{
          this.replyComment.floorUuid = this.repliedComment.floorUuid
        }
        this.replyComment.puuid = this.repliedComment.uuid
	      this.replyComment.content = '@' + this.repliedComment.name + ' '
      },

      //回复成功
	    replyCreateSuccess(){
        Message.success('回复成功！')
        this.refresh()
        //清空非楼层回复中的内容
        this.replyComment.content = null
        this.replyModel = false
	    }




    },
    components: {
      NbPager,
      NbExpanding,
      CommentTextarea
    },
    mounted () {
      if (this.$store.state.route.params.uuid) {
        this.articleUuid = this.$store.state.route.params.uuid
        this.pager.setFilterValue('articleUuid', this.articleUuid)
        this.refresh()
	      this.floorComment.articleUuid = this.articleUuid
        this.floorComment.isFloor = true
        this.replyComment.articleUuid = this.articleUuid
        this.replyComment.isFloor = false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.article-comment-list {
		.new-comment {
			position: relative;
			margin: 20px 0 20px 0;

			/*.user-avatar {
				position: absolute;
				left: -50px;
			}*/

		}
		.comment-list {
			.comment-box {
				padding: 20px 0;
				border-top: 1px solid #f0f0f0;
				.comment-date {
					font-size: 12px;
					color: #969696;
				}
				.comment-text {
					font-size: 15px;
					color: #2b2b2b;
				}
				.comment-operate {
					font-size: 15px;
					color: #969696;
				}
				.sub-comment-box {
					padding: 10px 20px;
					box-sizing: border-box;
					border-left: 2px solid #d9d9d9;
					.sub-comment {
						border-bottom: 1px dashed #f0f0f0;
						margin-bottom: 15px;
						padding-bottom: 15px;
						color: #969696;
					}

				}
			}
		}
	}
</style>