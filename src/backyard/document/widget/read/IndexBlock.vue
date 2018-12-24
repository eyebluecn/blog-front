<template>

  <div class="index-block">

    <div class="line"
         :class="{blank:article.type === ArticleType.DOCUMENT_BLANK,
         fat:article.hasChildren(),
         active:article.uuid === $store.state.route.params.articleUuid,
         placeholder:article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE}">

      <i class="fa fa-caret-right" v-if="article.hasChildren() && !expand" @click.stop.prevent="toggleExpand"></i>
      <i class="fa fa-caret-down" v-if="article.hasChildren() && expand" @click.stop.prevent="toggleExpand"></i>

      <span class="title-span"
            @click.stop.prevent="clickTitle"
            :title="article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE?'该文章尚未创建，点击创建':article.title">
        {{article.title}}
      </span>
    </div>

    <NbExpanding>
      <div v-if="expand">
        <IndexBlock
          v-for="(attr,attrIndex) in article.children"
          :key="attrIndex"
          :article="attr"
          :document="document"
          :index="attrIndex"
          :container="article.children"
          :editMode="editMode"/>
      </div>
    </NbExpanding>


  </div>

</template>

<script>
  import NbExpanding from '../../../../common/widget/NbExpanding.vue'
  import Article from "../../../../common/model/article/Article";
  import {ArticleType, ArticleTypeList, ArticleTypeMap} from "../../../../common/model/article/ArticleType";

  export default {
    //利用name，进行递归。
    name: 'IndexBlock',
    data() {
      return {
        ArticleType,
        ArticleTypeList,
        ArticleTypeMap,
        expand: true
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
      NbExpanding
    },
    computed: {},
    watch: {},
    methods: {
      toggleExpand() {
        this.expand = !this.expand;
      },
      clickTitle() {
        if (this.article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE) {
          this.$router.push("/by/document/read/" + this.document.uuid + "/" + this.article.uuid)
        } else if (this.article.type === ArticleType.DOCUMENT_ARTICLE) {
          this.$router.push("/by/document/read/" + this.document.uuid + "/" + this.article.uuid)
        } else if (this.article.type === ArticleType.DOCUMENT_URL) {
          window.open(this.article.digest)
        } else {
          console.error("该类型还没有实现点击跳转")
        }
      }
    },
    mounted() {
    }
  }
</script>
