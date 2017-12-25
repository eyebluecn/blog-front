<template>
	<div class="article-cell">
		<div class="media" v-if="showUser">
			<div class="pull-left">
				<router-link :to="'/by/user/detail/'+article.user.uuid">
					<img class="img-circle w40 h40" :src="article.user.getAvatarUrl()"/>
				</router-link>
			</div>
			<div class="media-body">
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

					<span class="pull-right action-buttons">
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

		<div class="media">
			<div v-if="article.posterUrl" class="pull-right">
				<router-link :to="'/by/article/detail/' + article.uuid">
					<img :src="article.posterUrl + '?imageProcess=resize&imageResizeM=fill&imageResizeW=100&imageResizeH=100'" alt="">
				</router-link>
			</div>
			<div class="media-body">
				<div class="title">
					<router-link :to="'/by/article/detail/' + article.uuid">
						{{article.title}}
					</router-link>
				</div>
				<div class="digest">
					{{article.digest}}
				</div>
				<div>
					<span v-for="tag in article.tagArray">
						<Tag :tag="tag" :active="activeTagUuid === tag.uuid"></Tag>
					</span>
				</div>
			</div>

		</div>

		<div v-if="!showUser">
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
	import Tag from '../../tag/widget/Tag'
  import Article from '../../../common/model/article/Article'

  export default {
    name: 'article-cell',
	  data(){
      return{

      }
	  },
	  props:{
      article: {
        type: Article,
	      required: true
      },
      showUser:{
        type: Boolean,
        required: false,
        default: true
      },
      activeTagUuid: {
        type: String,
	      required: false,
	      default: ''
      },
		  delCallback: {
        type: Function,
			  required: true
		  }
	  },
	  components:{
      Tag
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.article-cell {
		background-color: #fff;
		border-bottom: 1px solid #eeeeee;
		padding: 20px 20px 10px 20px;

		.author-name {
			color: #555;
			&:hover {
				color: #000;
				text-decoration: underline;
			}
		}
		.title {
			margin-bottom: 10px;
			a {
				font-size: 18px;
				font-weight: bold;
				color: #555;
				&:hover {
					color: #000;
					text-decoration: underline;
				}
			}
		}

		.digest {
			margin-bottom: 10px;
		}
	}
</style>