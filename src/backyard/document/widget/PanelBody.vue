<template>

  <div class="panel-body">

    <div class="form-group">
      <div class="col-xs-12">
        <div class="row">
          <label class="col-md-2 control-label mt5">节点名称</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="article.title"/>
          </div>
        </div>
      </div>

      <div class="col-xs-12 mt10">
        <div class="row">
          <label class="col-md-2 control-label mt5">
            是否可见
            <i class="fa fa-question-circle cursor" title="可见：在首页的导航栏中显示。不可见：在首页的导航栏中不可见，但是同样可以通过url访问到该页面。"></i>
          </label>
          <div class="col-md-10">
            <NbSwitcher v-model="article.privacy"/>
          </div>
        </div>
      </div>

      <div class="col-xs-12 mt10">
        <div class="row">
          <label class="col-md-2 control-label mt5">菜单类型</label>
          <div class="col-md-10">
            <select class="form-control"
                    name="category" v-model="article.type" :disabled="article.children && article.children.length>0">
              <option v-for="category in ArticleTypeList" :value="category.value">{{category.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="col-xs-12 mt10">
        <div class="row">
          <label class="col-md-2 control-label mt5">菜单链接</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="article.path"/>
          </div>
        </div>
      </div>

      <div class="col-xs-12">
        <div class="alert alert-danger mt10 mb0" v-show="article.errorMessage">
          {{article.errorMessage}}
        </div>
      </div>

    </div>

  </div>

</template>

<script>

  import NbFilter from '../../../common/widget/filter/NbFilter.vue'
  import NbSwitcher from '../../../common/widget/NbSwitcher'
  import NbTank from '../../../common/widget/NbTank'
  import Article from "../../../common/model/article/Article";
  import {ArticleType, ArticleTypeList, ArticleTypeMap} from "../../../common/model/article/ArticleType";

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
      },
      filterCallback() {
        console.log("filterCallback")
      }
    },
    mounted() {
    }
  }
</script>
