<template>

  <div class="level-block">

    <div class="panel panel-default">
      <div class="panel-heading clearfix"
           :class="{'error':article.errorMessage}"
           @click.stop.prevent="levelClick(article)">
        <div class="pull-left">
          <span>
						{{article.title?article.title:"请填写节点名称"}}
					</span>
          <span class="ml10"
                v-if="article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE || article.type === ArticleType.DOCUMENT_ARTICLE">
						<span class="label-attribute">{{article.path}}</span>
					</span>
          <span class="ml10 label-topic" v-if="article.type === ArticleType.DOCUMENT_URL">
						<i class="fa fa-link"></i>
						<span class="label-link">{{article.digest}}</span>
					</span>
        </div>
        <div class="pull-right">
          <ActionButtons :index="index" :article="article" :container="container" :editMode="editMode"/>
        </div>
      </div>

      <NbExpanding>
        <PanelBody v-if="article.editMode" :article="article" :container="container"/>
      </NbExpanding>
    </div>

    <LevelBlock v-for="(attr,attrIndex) in article.children"
                :key="attrIndex"
                :article="attr"
                :document="document"
                :index="attrIndex"
                :container="article.children"
                :editMode="editMode"/>

  </div>

</template>

<script>
  import ActionButtons from "./ActionButtons.vue"
  import PanelBody from "./PanelBody.vue"
  import NbExpanding from '../../../../common/widget/NbExpanding.vue'
  import Article from "../../../../common/model/article/Article";
  import {ArticleType, ArticleTypeList, ArticleTypeMap} from "../../../../common/model/article/ArticleType";

  export default {
    //利用name，进行递归。
    name: 'LevelBlock',
    data() {
      return {
        ArticleType,
        ArticleTypeList,
        ArticleTypeMap
      }
    },
    props: {
      editMode: {
        type: Boolean,
        required: false,
        "default": false
      },
      article: {
        type: Article,
        required: false
      },
      document: {
        type: Article,
        required: true
      },
      container: {
        type: Array,
        required: true
      },
      index: {
        type: Number,
        required: true
      }

    },
    components: {
      ActionButtons,
      PanelBody,
      NbExpanding
    },
    computed: {},
    watch: {},
    methods: {
      levelClick(article) {
        if (this.editMode) {

          if (article.editMode) {
            //尝试去服务器保存。
            article.httpSave(function () {
              article.editMode = !article.editMode
            })

          }
        }
      }
    },
    mounted() {
    }
  }
</script>
