<template>
	<div class="article-hot-widget">
		<div v-for="article in articles">
			<div class="hot-article">
				<router-link :to="'/by/article/detail/' + article.uuid">
					{{article.title}}
				</router-link>
				{{article.hit}}阅读
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'article-hot',
	  props:{
      articles: {
        type: Array,
	      required: false,
	      default: []
      }
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.article-hot-widget{
		.hot-article {

			margin: 10px 0;
			color: #8590a6;
			a {
				color: #175199;
				font-size: 14px;
				&:hover {
					text-decoration: underline;
				}
			}

		}
	}
</style>