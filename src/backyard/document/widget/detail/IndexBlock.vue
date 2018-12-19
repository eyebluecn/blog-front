<template>

  <div class="index-block">

    <div class="line" :class="{blank:article.type === ArticleType.DOCUMENT_BLANK}">
      <div class="left-part"
           :class="{fat:article.hasChildren(),placeholder:article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE}">
        <i class="fa fa-caret-right" v-if="article.hasChildren() && !expand" @click.stop.prevent="toggleExpand"></i>
        <i class="fa fa-caret-down" v-if="article.hasChildren() && expand" @click.stop.prevent="toggleExpand"></i>


        <span class="title-span"
              :title="article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE?'该文章尚未创建，点击创建':article.title">
          {{article.title}}
        </span>

      </div>
      <div class="right-part">
        {{(article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE || article.type ===
        ArticleType.DOCUMENT_ARTICLE)?article.path:
        (article.type === ArticleType.DOCUMENT_URL?article.digest:'')}}
      </div>
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
      }
    },
    mounted() {
    }
  }
</script>
