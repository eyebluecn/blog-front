<template>
	<div class="article-comment-list">
		<div>
			<h2 class="black">欢迎评论</h2>
			<div class="new-comment">
				<CommentTextarea :comment="floorComment" @success="floorCreateSuccess"></CommentTextarea>
			</div>
			<div>

				<span class="f24" style="font-weight: 100">
					共{{pager.totalItems}}条评论
				</span>
				<span class="pull-right" v-if="reportCommentUuid">
					<button class="btn btn-sm btn-primary" @click.stop.prevent="$router.go(-1)">
						返回
					</button>
					<button class="btn btn-sm btn-primary" @click.stop.prevent="totalComment">
						所有评论
					</button>
				</span>

			</div>
			<div class="comment-list">
				<div>
					<div class="comment-box" v-for="commentFloor in pager.data">
						<div>

              <div class="pull-left mr10">
                <a :href="'/by/user/detail/'+commentFloor.userUuid" v-if="commentFloor.userUuid" title="站内用户">
                  <img v-if="commentFloor.avatarUrl" class="img-circle img-sm" :src="commentFloor.avatarUrl+'?imageProcess=resize&imageResizeM=fill&imageResizeW=200&imageResizeH=200'"/>
                  <img class="img-circle img-sm" src="../../../assets/img/avatar.png" v-else />
                </a>
                <img class="img-circle img-sm" src="../../../assets/img/avatar.png" v-else />
              </div>

							<div>
								<p class="mb0">
                  <span class="text-primary" v-if="commentFloor.userUuid">
                     <a :href="'/by/user/detail/'+commentFloor.userUuid" title="站内用户">
                        {{commentFloor.name}}
                        <span class="text-warning" v-if="commentFloor.userUuid === article.userUuid">(作者)</span>
                     </a>
                  </span>
                  <span class="black" v-else >{{commentFloor.name}}</span>
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
									<em class="fa fa-thumbs-o-up" v-if="!commentFloor.agreed"></em> <em class="fa fa-thumbs-up red"
									                                                                    v-else></em> {{commentFloor.agree}}人赞过
								</span>
								<span class="cursor ml20" @click.stop.prevent="prepareReply(commentFloor)">
									<em class="fa fa-commenting-o"></em> 回复
								</span>
								<span class="cursor ml20" @click.stop.prevent="commentFloor.confirmDel(refresh)">
									<em class="fa fa-trash-o"></em> 删除
								</span>
							</div>
							<div class="sub-comment-box mt15" v-if="commentFloor.commentPager.totalItems">
								<div v-for="subComment in commentFloor.commentPager.data" class="sub-comment">
									<div class="mb10 black">
										<span>
                      <span class="text-primary" v-if="subComment.userUuid">
                      <a :href="'/by/user/detail/'+subComment.userUuid" title="站内用户">
                        {{subComment.name}}
                        <span class="text-warning" v-if="subComment.userUuid === article.userUuid">(作者)</span>
                      </a>
                      </span>
                      <span class="black" v-else >{{subComment.name}}</span>
                      <span>：</span>
                    </span>
										<span>{{subComment.content}}</span>
									</div>
									<div>
										<span>{{subComment.createTime | simpleDateTime}}</span>
										<span class="cursor ml20" @click.stop.prevent="agreeChange(subComment)">
											<em class="fa fa-thumbs-o-up" v-if="!subComment.agreed"></em> <em class="fa fa-thumbs-up red"
											                                                                  v-else></em> {{subComment.agree}}人赞过
										</span>
										<span class="cursor ml20" @click.stop.prevent="prepareReply(subComment)">
											<em class="fa fa-commenting-o"></em> 回复
										</span>
										<span class="cursor ml20" @click.stop.prevent="subComment.confirmDel(refresh)">
											<em class="fa fa-trash-o"></em> 删除
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
  import NbPager from '../../../common/widget/NbPager.vue'
  import NbExpanding from '../../../common/widget/NbExpanding'
  import Pager from '../../../common/model/base/Pager'
  import Comment from '../../../common/model/comment/Comment'
  import CommentTextarea from './CommentTextarea'
  import { simpleDateTime } from '../../../common/filter/time'
  import { Message } from 'element-ui'
  import Article from '../../../common/model/article/Article'

  export default {

    data () {
      return {
        user: this.$store.state.user,
        pager: new Pager(Comment),
        floorComment: new Comment(),
        repliedComment: new Comment(),
        replyComment: new Comment(),
        replyModel: false,
	      reportCommentUuid: null
      }
    },
    props: {
      article: {
        type: Article,
        required: true
      },
      commentUuid: {
        type: String,
        required: false
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
      agreeChange (comment) {
        comment.httpAgreeChange()
      },

      //楼层回复成功
      floorCreateSuccess () {
        Message.success('评论成功！')
        this.refresh()
        //清空楼层回复中的内容
        this.floorComment.content = null
      },

      //准备回复
      prepareReply (comment) {

        if (this.replyModel && comment.uuid === this.repliedComment.uuid) {
          this.replyModel = false
          return
        }
        this.replyModel = true
        this.repliedComment.render(comment)
        if (this.repliedComment.isFloor) {
          this.replyComment.floorUuid = this.repliedComment.uuid
        } else {
          this.replyComment.floorUuid = this.repliedComment.floorUuid
        }
        this.replyComment.puuid = this.repliedComment.uuid
        this.replyComment.content = '@' + this.repliedComment.name + ' '
      },

      //回复成功
      replyCreateSuccess () {
        Message.success('回复成功！')
        this.refresh()
        //清空非楼层回复中的内容
        this.replyComment.content = null
        this.replyModel = false
      },

      //展开所有评论
      totalComment () {
        this.reportCommentUuid = null
        this.pager.setFilterValue('uuid', this.reportCommentUuid)
	      this.refresh()

      }
    },
    components: {
      NbPager,
      NbExpanding,
      CommentTextarea
    },
    mounted () {
      this.pager.setFilterValue('articleUuid', this.article.uuid)
      this.floorComment.articleUuid = this.replyComment.articleUuid = this.article.uuid
      this.floorComment.isFloor = true
      this.replyComment.isFloor = false

      if (this.commentUuid) {
        this.reportCommentUuid = this.commentUuid
        this.pager.setFilterValue('uuid', this.reportCommentUuid)
      }
      this.refresh()
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
