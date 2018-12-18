<template>
	<span v-show="editMode">
		<a class="btn-action" title="完成" v-show="article.editMode">
			<i class="fa fa-check text-success f18"></i>
		</a>

		<a class="btn-action" title="编辑" v-show="!article.editMode"
       @click.stop.prevent="article.toggleEdit">
			<i class="fa fa-pencil text-warning f18"></i>
		</a>

		<a class="btn-action" title="添加子菜单" v-show="!article.editMode"
       @click.stop.prevent="article.addChild">
			<i class="fa fa-plus text-success f18"></i>
		</a>

		<a class="btn-action" title="上移" v-show="!article.editMode && index !== 0"
       @click.stop.prevent="moveUp(index,container)">
			<i class="fa fa-arrow-up f18"></i>
		</a>

		<a class="btn-action" title="下移" v-show="!article.editMode && index !== container.length - 1"
       @click.stop.prevent="moveDown(index,container)">
			<i class="fa fa-arrow-down f18"></i>
		</a>

		<a class="btn-action" title="删除" v-if="!article.special" @click.stop.prevent="del">
			<i class="fa fa-trash text-danger f18"></i>
		</a>

	</span>
</template>

<script>
  import {MessageBox} from 'element-ui';
  import Article from "../../../../common/model/article/Article";
  import {moveDown, moveUp} from "../../../../common/util/ElementUtil";

  export default {
    data() {
      return {}
    },
    props: {
      editMode: {
        type: Boolean,
        required: false,
        "default": false
      },
      article: {
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
        MessageBox.confirm('此操作将删除该菜单及其子菜单，确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {

            //没有uuid的表示只在本地
            if (that.article.uuid) {
              that.article.httpDel(function () {
                that.container.splice(that.index, 1);
              })
            } else {
              that.container.splice(that.index, 1);
            }
          }
        );

      }
    },
    mounted() {
    }
  }
</script>
