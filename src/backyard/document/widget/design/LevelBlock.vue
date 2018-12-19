<template>

  <div class="level-block">

    <div class="panel panel-default">
      <div class="panel-heading clearfix"
           :class="{'error':article.errorMessage}"
           @click.stop.prevent="levelClick()">
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
          <ActionButtons :index="index" :article="article" :container="container"/>
        </div>
      </div>

      <NbExpanding>
        <PanelBody v-if="article.designMode"
                   :article="article"
                   :candidateArticle="candidateArticle"
                   :container="container"/>
      </NbExpanding>
    </div>

    <LevelBlock v-for="(attr,attrIndex) in article.children"
                :key="attrIndex"
                :article="attr"
                :document="document"
                :index="attrIndex"
                :container="article.children"/>

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
        ArticleTypeMap,
        //要作为被选中的文章
        candidateArticle: new Article()

      }
    },
    props: {
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
      levelClick() {
        let that = this
        if (that.article.designMode) {


          //如果当前节点是 新文章，空白，链接。直接编辑即可
          if (that.article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE ||
            that.article.type === ArticleType.DOCUMENT_BLANK ||
            that.article.type === ArticleType.DOCUMENT_URL
          ) {
            //尝试去服务器保存。
            that.article.httpSave(function () {
              that.article.designMode = !that.article.designMode
            })

          } else if (that.article.type === ArticleType.DOCUMENT_ARTICLE) {

            that.document.httpDocumentAssign(
              that.document.uuid,
              that.article.puuid,
              that.candidateArticle.uuid,
              that.article.sort,
              function () {
                that.$message.success("指定文章成功！")

                that.article.title = that.candidateArticle.title
                that.article.path = that.candidateArticle.path
                that.article.designMode = false

              })


          }


        }
      }
    },
    mounted() {
    }
  }
</script>
