<template>
	<span>
		<a class="btn-action" title="完成" v-show="article.designMode">
			<i class="fa fa-check text-success f18"></i>
		</a>

		<a class="btn-action" title="编辑"
       v-show="article.type !== ArticleType.DOCUMENT_ARTICLE && !article.designMode"
       @click.stop.prevent="article.toggleDesignMode">
			<i class="fa fa-pencil text-warning f18"></i>
		</a>

		<a class="btn-action" title="添加子菜单" v-show="!article.designMode"
       @click.stop.prevent="article.addChild">
			<i class="fa fa-plus text-success f18"></i>
		</a>

		<a class="btn-action" title="上移" v-show="!article.designMode && index !== 0"
       @click.stop.prevent="moveUp(index,container)">
			<i class="fa fa-arrow-up f18"></i>
		</a>

		<a class="btn-action" title="下移" v-show="!article.designMode && index !== container.length - 1"
       @click.stop.prevent="moveDown(index,container)">
			<i class="fa fa-arrow-down f18"></i>
		</a>

		<a class="btn-action" title="删除" v-if="!article.special" @click.stop.prevent="del">
			<i class="fa fa-trash text-danger f18"></i>
		</a>

	</span>
</template>

<script>
  import Article from "../../../../common/model/article/Article";
  import {moveDown, moveUp} from "../../../../common/util/ElementUtil";
  import {ArticleType} from "../../../../common/model/article/ArticleType";

  export default {
    data() {
      return {
        ArticleType
      }
    },
    props: {
      article: {
        type: Article,
        required: true
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
    computed: {},
    watch: {},
    methods: {
      moveUp,
      moveDown,
      del() {
        let that = this;

        //没有uuid的表示只在本地
        if (that.article.uuid) {

          //文章或者父节点有必要提醒
          if (that.article.type === ArticleType.DOCUMENT_ARTICLE || that.article.hasChildren()) {
            this.$confirm('"彻底删除"将完全删除该目录及其子目录对应的文章，不可恢复；"从目录中移除"仅从此文档中删除目录，后续可自行恢复。', '确认信息', {
              type: "warning",
              distinguishCancelAndClose: true,
              confirmButtonText: '彻底删除',
              cancelButtonText: '从目录中移除'
            }).then(() => {

              that.document.httpDocumentIndexDel(that.document.uuid, that.article.uuid, true, function () {
                that.container.splice(that.index, 1);

                that.$message.success("删除成功！")

              })

            }).catch(action => {

              if (action === 'cancel') {

                that.document.httpDocumentIndexDel(that.document.uuid, that.article.uuid, false, function () {
                  that.container.splice(that.index, 1);

                  that.$message.success("删除成功！")

                })

              } else if (action === 'close') {
                console.info("放弃了删除！");
              } else {
                console.error("错误的操作状态", action)
              }

            });
          } else {
            //空白文档，空白节点，超链接没必要详细提醒。
            this.$confirm('此操作将删除该目录，确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(function () {

              that.document.httpDocumentIndexDel(that.document.uuid, that.article.uuid, false, function () {
                that.container.splice(that.index, 1);

                that.$message.success("删除成功！")

              })

            });

          }


        } else {
          that.container.splice(that.index, 1);

          that.$message.success("删除成功！")
        }


      }
    },
    mounted() {
    }
  }
</script>
