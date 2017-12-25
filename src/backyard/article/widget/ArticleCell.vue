<template>
	<div class="article-cell">

		<ArticleInfo :article="article" :showUser="showUser" :showOperate="showOperate" :delCallback="delCallback"/>

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

	</div>
</template>

<script>
	import Tag from '../../tag/widget/Tag'
  import ArticleInfo from '../widget/ArticleInfo'
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
      showOperate: {
        type: Boolean,
        required: false,
        default: false
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
      Tag,
      ArticleInfo
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