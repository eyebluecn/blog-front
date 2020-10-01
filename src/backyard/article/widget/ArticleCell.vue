<template>
  <div class="article-cell">

    <div v-if="articleInfoPosition === 'top'">
      <ArticleInfo :article="article" :showUser="showUser" :showOperate="showOperate" :delCallback="delCallback"/>
    </div>

    <div class="media">
      <div v-if="article.posterUrl" class="pull-right">
        <router-link :to="'/by/article/detail/' + article.uuid">
          <img :src="article.posterUrl + '?ir=fit_100_0'"
               alt="">
        </router-link>
      </div>
      <div class="media-body">
        <div class="title">
          <i class="fa fa-rocket text-danger f18 mr5" v-if="article.top" title="置顶文章"></i>
          <i class="fa fa-lock f18 mr5" v-if="article.privacy" title="私有文章，只有自己可见"></i>
          <router-link :to="'/by/article/detail/' + article.uuid">
            {{article.title}}
          </router-link>

        </div>
        <div class="digest">
          {{article.digest}}
        </div>
        <div>
					<span v-for="tag in article.tagArray">
						<TagCell :tag="tag" :active="activeTagUuid === tag.uuid"/>
					</span>
        </div>
      </div>

    </div>

    <div v-if="articleInfoPosition === 'bottom'">
      <ArticleInfo :article="article" :showUser="showUser" :showOperate="showOperate" :delCallback="delCallback"/>
    </div>

  </div>
</template>

<script>
import TagCell from '../../tag/widget/TagCell'
import ArticleInfo from '../widget/ArticleInfo'
import Article from '../../../common/model/article/Article'


export default {
  name: 'article-cell',
  data() {
    return {}
  },
  props: {
    article: {
      type: Article,
      required: true
    },
    articleInfoPosition: {
        type: String,
        required: false,
        default: 'top'
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
      activeTagUuid: {
        type: String,
        required: false,
        default: ''
      },
      delCallback: {
        type: Function,
        required: false,
        default: function () {
          return true
        }
      }
    },
    components: {
      TagCell,
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
