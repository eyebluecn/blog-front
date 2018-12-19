<template>

  <div class="document-index-frame">

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

  .document-index-frame {

    .index-block {
      margin: 5px 0 5px 25px;

      @cell-height: 36px;
      .line {
        display: flex;
        justify-content: space-between;
        position: relative;

        .left-part {
          .one-line;
          height: @cell-height;
          line-height: @cell-height;
          background-color: white;
          padding-right: 10px;
          padding-left: 14px;
          z-index: 1;
          font-size: 14px;
          color: #222;
          cursor: pointer;

          .fa {
            width: 10px;
            color: #aaa;
          }
          &.fat {
            padding-left: 0;
          }
          &.placeholder {
            .title-span {
              border-bottom: 1px dashed red;
            }
          }

          &:hover {
            color: #777;
          }
        }
        .right-part {
          display: inline-block;
          white-space: nowrap;
          height: @cell-height;
          line-height: @cell-height;
          background-color: white;
          padding: 0 10px;
          z-index: 1;
          font-size: 14px;
          color: #bfbfbf;
          cursor: pointer;

          &:hover {
            color: #777;
          }
        }

        &:before {
          content: " ";
          width: 100%;
          border-bottom: 1px dashed #e8e8e8;
          top: 50%;
          position: absolute;
          right: 0;
          z-index: 0;
        }

        //空节点，不带引导线
        &.blank {
          &:before {
            border-bottom: 1px dashed transparent;
          }
        }

      }
    }

    //第一层级不缩进
    > .index-block {
      margin-left: 0;
      > .line {
        .left-part {
          font-weight: bold;
        }
      }
    }

  }
</style>
