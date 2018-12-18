<template>

  <div class="panel-body">

    <div class="form-group mb0">

      <div class="col-md-12">
        <div class="row">
          <label class="col-md-12 control-label compulsory">节点类型</label>
          <div class="col-md-4">
            <select class="form-control"
                    title="节点类型"
                    v-model="article.type">
              <option :value="ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE">新文章</option>
              <option :value="ArticleType.DOCUMENT_ARTICLE">文章</option>
              <option :value="ArticleType.DOCUMENT_BLANK">空节点</option>
              <option :value="ArticleType.DOCUMENT_URL">超链接</option>
            </select>
          </div>
        </div>
      </div>

      <div class="col-md-6 mt10">
        <div>
          <label class="control-label compulsory">标题</label>
        </div>
        <div>
          <input type="text" class="form-control" v-model="article.title"/>
        </div>
      </div>

      <div class="col-md-6 mt10" v-if="
                article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE ||
          article.type === ArticleType.DOCUMENT_ARTICLE">
        <div>
          <label class="control-label compulsory">
            路径(只允许小写字母,"-","_")</label>
        </div>
        <div>
          <input type="text" class="form-control" v-model="article.path"/>
        </div>
      </div>

      <div class="col-md-6 mt10" v-if="article.type === ArticleType.DOCUMENT_URL">
        <div>
          <label class="control-label compulsory">
            超链接(以http://或https://开头)</label>
        </div>
        <div>
          <input type="text" class="form-control" placeholder="https://" v-model="article.digest"/>
        </div>
      </div>

      <div class="col-md-12 mt10 italic">
        <i class="fa fa-info-circle"></i>
        <span v-if="article.type === ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE">该节点是用于新文章占位，以便于设计整体目录结构，您可以在文档预览状态下点击该节点创建新文章。</span>
        <span v-if="article.type === ArticleType.DOCUMENT_ARTICLE">
          修改标题和路径会同步到该篇文章，如需选择其他文章，请
          <a href="javascript:void(0)">重新选择</a>
        </span>
        <span v-if="article.type === ArticleType.DOCUMENT_BLANK">空节点用于组织其他节点，一般作为父级目录使用。</span>
        <span v-if="article.type === ArticleType.DOCUMENT_URL">点击该目录将在新窗口打开页面。</span>
      </div>

      <div class="col-md-12">
        <div class="alert alert-danger mt10 mb0" v-show="article.errorMessage">
          {{article.errorMessage}}
        </div>
      </div>

    </div>

  </div>

</template>

<script>

  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbSwitcher from '../../../../common/widget/NbSwitcher'
  import NbTank from '../../../../common/widget/NbTank'
  import Article from "../../../../common/model/article/Article";
  import {ArticleType, ArticleTypeList, ArticleTypeMap} from "../../../../common/model/article/ArticleType";

  export default {
    data() {
      return {
        ArticleType,
        ArticleTypeMap,
        ArticleTypeList
      }
    },
    props: {
      article: {
        type: Article,
        required: true
      },
      container: {
        type: Array,
        required: true
      }

    },
    components: {
      NbFilter,
      NbSwitcher,
      NbTank
    },
    computed: {},
    watch: {},
    methods: {
      exist(entity) {
        for (let j = 0; j < this.container.length; j++) {
          let b = this.container[j];
          if (entity.title === b.title && b.title !== this.article.title) {
            return true;
          }
        }
        return false;
      }
    },
    mounted() {
    }
  }
</script>
