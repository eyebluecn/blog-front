<template>

  <div ref="documentIndexReadFrame" class="document-index-read-frame">

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
  import PerfectScrollbar from "perfect-scrollbar";
  import "perfect-scrollbar/css/perfect-scrollbar.css";

  export default {
    data() {
      return {
        perfectScrollbar: null
      }
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
      this.perfectScrollbar = new PerfectScrollbar(this.$refs.documentIndexReadFrame);

    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  @import "../../../../assets/css/global/variables";
  @import "../../../../assets/css/global/miscellaneous";

  .document-index-read-frame {

    padding: 10px 0;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .index-block {
      margin-left: 14px;

      .line {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        padding: 5px 10px 5px 15px;

        font-size: 14px;
        color: #222;
        cursor: pointer;

        .fa {
          width: 8px;
          color: #aaa;
        }
        &.fat {
          padding-left: 2px;
        }
        &.placeholder {
          .title-span {
            border-bottom: 1px dashed red;
          }
        }
        &.active {
          color: @brand-primary;
          font-weight: bold;
        }

        &:hover {
          color: #777;
        }

      }
    }

    //第一层级不缩进
    > .index-block {
      margin-left: 0;

    }

  }
</style>
