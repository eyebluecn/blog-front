<template>
	<div class="article-comment-list">
		<div>
			<h2>请写下你的评论</h2>
			<div class="new-comment">
				<img class="user-avatar img-circle img-sm" src="../../assets/img/avatar.png" alt="">
				<textarea class="comment-text" placeholder="你的评论..."></textarea>
				<div class="comment-plugin mt5 text-right">
					<button class="btn btn-primary btn-sm">发送</button>
				</div>
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
								<span class="cursor">
									<em class="fa fa-commenting-o"></em> 回复
								</span>
							</div>
							<div class="sub-comment-box mt15">
								<div v-for="comment in commentFloor.commentPager">
									<div>
										<span>散漫：坚持做自己！说的好！坚持自己的本心，不畏人言！谢谢亲~</span>
									</div>
									<div>
										<span>2017.12.16 12:34</span>
									</div>
								</div>
								<div>
									<NbPager :pager="commentFloor.commentPager" :callback="subRefresh(commentFloor.commentPager)"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mt20">
					<NbPager :pager="pager" :callback="refresh"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import NbPager from '../../common/widget/NbPager.vue'
  import Pager from '../../common/model/base/Pager'
  import Comment from '../../common/model/comment/Comment'
  import {simpleDateTime} from '../../common/filter/time'

  export default {
    name: 'list',
	  data(){
      return{
				pager: new Pager(Comment)
      }
	  },
	  methods:{
      search(){
        this.pager.page = 0
	      this.refresh()
      },
			refresh(){
			  this.pager.httpFastPage()
			},
      subRefresh(pager){
        pager.httpFastPage()
      }
	  },
	  components:{
      NbPager
	  },
	  mounted(){
      if(this.$store.state.route.params.uuid){
        this.pager.setFilterValue('articleUuid',this.$store.state.route.params.uuid)
	      this.refresh()
      }
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.article-comment-list{
		.new-comment{
			position: relative;
			margin: 20px 0 20px 50px;
			.user-avatar{
				position: absolute;
				left: -50px;
			}
			.comment-text{
				padding: 10px 15px;
				width: 100%;
				height: 80px;
				font-size: 13px;
				border: 1px solid #dcdcdc;
				border-radius: 5px;
				background-color: hsla(0,0%,71%,.1);
				resize: none;
				display: inline-block;
				vertical-align: top;
				outline-style: none;
			}
		}
		.comment-list{
			.comment-box{
				padding: 20px 0;
				border-top: 1px solid #f0f0f0;
				.comment-date{
					font-size: 12px;
					color: #969696;
				}
				.comment-text{
					font-size: 15px;
					color: #2b2b2b;
				}
				.comment-operate{
					font-size: 15px;
					color: #969696;
				}
				.sub-comment-box{
					padding: 20px;
					box-sizing: border-box;
					border-left: 2px solid #d9d9d9;
				}
			}
		}
	}
</style>