<template>

  <div class="document-menu-frame">

    <LevelBlock v-for="(article,index) in document.children"
                :key="index"
                :article="article"
                :document="document"
                :index="index"
                :container="document.children"/>

    <div class="level add" @click.stop.prevent="addMenu">
      <i class="fa fa-plus"></i>
      添加菜单
    </div>

  </div>
</template>

<script>
  import LevelBlock from "./LevelBlock.vue"
  import Article from "../../../../common/model/article/Article";
  import {ArticleType} from "../../../../common/model/article/ArticleType";
  import {simpleDate} from "../../../../common/filter/time";

  export default {
    data() {
      return {}
    },
    props: {
      document: {
        type: Article,
        required: true
      }
    },
    components: {
      LevelBlock
    },
    computed: {},
    watch: {},
    methods: {
      addMenu() {

        let article = new Article()
        article.path = simpleDate(new Date())
        article.documentUuid = this.document.uuid
        article.puuid = Article.ROOT
        article.sort = (new Date()).getTime()
        article.document = this.document
        article.type = ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE
        article.designMode = true

        this.document.children.push(article)

      }
    },
    mounted() {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  @import "../../../../assets/css/global/variables";
  @import "../../../../assets/css/global/miscellaneous";

  .document-menu-frame {

    @color-bg: #F8FAFF;
    @color-bg-highlight: #F4F6F7;
    @color-border: #DAE2EA;
    @color-border-highlight: #DCE2E8;
    @color-attribute: #d9534f;
    @color-attribute-highlight: #d91903;
    @color-field: #3F6AB2;
    @color-field-highlight: #0645b2;
    @color-document: #0cb20c;
    @color-document-highlight: #0ab224;

    @color-collection: #b28813;
    @color-collection-highlight: #b26905;
    @color-add-btn: #999;
    @color-add-btn-highlight: #555;

    .label-attribute {
      font-weight: bold;
      color: @color-attribute;
    }
    .label-document {
      font-weight: bold;
      color: @color-collection-highlight;
    }
    .label-title {
      display: inline-block;
      max-width: 200px;
      .one-line;
    }
    .label-path {
      display: inline-block;
      max-width: 200px;
      .one-line;
    }
    .label-link {
      font-weight: bold;
      color: @color-document-highlight;

      display: inline-block;
      max-width: 200px;
      .one-line;
    }

    .label-field {
      font-weight: bold;
      color: @color-field;
    }

    option:disabled {
      color: red;
    }

    .level-block {
      margin: 5px 0 5px 25px;
    }
    > .level-block {
      margin-left: 0;
    }

    .panel {
      margin-bottom: 0;
    }
    .panel-body {
      border-top: 1px solid #ddd;
    }
    .level, .panel-heading {

      border-color: transparent;
      padding: 10px 15px 5px 15px;

      &.error {
        border: 1px dashed red;
      }

      cursor: pointer;
      background: @color-bg;
      color: @color-field;

      text-decoration: none;
      font-weight: bold;
      box-sizing: border-box;

      //添加属性按钮
      &.add {

        min-height: 38px;
        margin: 10px 0;
        padding: 8px 12px;

        text-align: center;
        border: 1px dashed @color-add-btn;
        color: @color-add-btn;
      }

      &:hover {
        color: @color-field-highlight;

        background: @color-bg-highlight;
        &.add {
          border: 1px dashed @color-add-btn-highlight;
          color: @color-add-btn-highlight;
        }
      }
    }

  }
</style>
