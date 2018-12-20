<template>

  <div class="document-index-read-frame">

    <IndexBlock v-for="(article,index) in document.children"
                :key="index"
                :article="article"
                :document="document"
                :index="index"
                :container="document.children"/>

  </div>
</template>

<script>
  import IndexBlock from "./IndexBlock.vue"
  import Article from "../../../../common/model/article/Article";

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
      IndexBlock
    },
    computed: {},
    watch: {},
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  @import "../../../../assets/css/global/variables";
  @import "../../../../assets/css/global/miscellaneous";

  .document-index-read-frame {

    .index-block {
      margin: 5px 0 5px 25px;

      .line {
        .one-line;
      }
    }

    //第一层级不缩进
    > .index-block {
      margin-left: 0;

    }

  }
</style>
