<template>
  <div class="animated fadeIn backyard-document-write">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
            <span class="item active">
              <span>{{article.title?article.title:'写文章'}}</span>
            </span>
          <span class="tool">
            <button class="btn btn-sm btn-primary mr1" @click.stop.prevent="showOutline = !showOutline">
              <span v-show="!showOutline">
                <i class="fa fa-caret-right"></i>
                展开基本信息
              </span>
              <span v-show="showOutline">
                <i class="fa fa-caret-down"></i>
                收起基本信息
              </span>
            </button>
            <button class="btn btn-sm btn-primary mr5"
                    v-if="article.document"
                    @click.stop.prevent="$router.push('/by/document/detail/'+article.document.uuid)">
              <i class="fa fa-cubes"></i>
                返回文档
            </button>

            <CreateSaveButton :entity="article" :callback="save"/>
          </span>
        </div>
      </div>
    </div>

    <LoadingFrame :loading="article.detailLoading">
      <NbExpanding>
        <div class="document-write-block" v-show="showOutline">
          <div class="row">

            <div class="col-md-6 mb10">
              <label class="control-label mt5 compulsory">文章名称</label>
              <div class="">
                <input type="text" class="form-control" v-model="article.title">
              </div>
            </div>

            <div class="col-md-6 mb10">
              <label class="control-label mt5 compulsory">路径（只允许数字，小写字母，"-"和"_"）</label>
              <div class="">
                <input type="text" class="form-control" v-model="article.path">
              </div>
            </div>

            <div class="col-md-6 mb10" v-if="article.document">
              <label class="control-label mt5 compulsory">所属文档</label>
              <div class="">
                <input type="text" :disabled="true" class="form-control" :value="article.document.title">
              </div>
            </div>

          </div>
        </div>
      </NbExpanding>

      <div class="row">

        <div class="col-md-12">
          <NbMarkdown ref="nbMarkdown" :value="article.markdown"/>
        </div>
      </div>

    </LoadingFrame>
  </div>
</template>
<script>

  import Article from '../../common/model/article/Article'
  import NbSlidePanel from '../../common/widget/NbSlidePanel.vue'
  import NbEditor from '../../common/widget/NbEditor.vue'
  import NbMarkdown from '../../common/widget/markdown/NbMarkdown'
  import NbCheckbox from '../../common/widget/NbCheckbox.vue'
  import NbTank from '../../common/widget/NbTank'
  import NbSwitcher from '../../common/widget/NbSwitcher.vue'
  import NbExpanding from '../../common/widget/NbExpanding'
  import CreateSaveButton from '../widget/CreateSaveButton.vue'
  import LoadingFrame from '../widget/LoadingFrame.vue'
  import {SortDirection} from "../../common/model/base/SortDirection";

  export default {

    data() {
      return {
        SortDirection,
        showOutline: false,
        user: this.$store.state.user,
        breadcrumbs: this.$store.state.breadcrumbs,
        article: new Article()
      }
    },
    components: {
      CreateSaveButton,
      LoadingFrame,
      NbEditor,
      NbMarkdown,
      NbExpanding,
      NbCheckbox,
      NbSlidePanel,
      NbSwitcher,
      NbTank
    },
    computed: {},
    watch: {},
    methods: {

      save() {
        let that = this

        // setTimeout(function () {
        //
        // }, 1000)

        this.article.markdown = this.$refs.nbMarkdown.getMarkdown();
        this.article.html = this.$refs.nbMarkdown.getHTML();

        console.log("markdown形状", this.article.markdown)

        //统计字数
        this.article.words = this.article.markdown.length
        this.article.httpDocumentArticleSave(function (response) {
          that.$message.success("保存成功！")
        })
      },
      refineBreadcrumb() {
        let that = this;
        //整理面包屑
        this.$store.state.route.params.documentUuid = that.article.document.uuid
        that.breadcrumbs.forEach(function (breadcrumb) {
          if (breadcrumb.name === "DocumentDetail") {
            breadcrumb.title = that.article.document.title
          }
        })
      }
    },
    mounted: function () {
      let that = this
      this.article.uuid = this.$store.state.route.params.uuid
      if (this.article.uuid) {
        this.article.editMode = true
        this.article.httpDetail(function () {
          that.refineBreadcrumb()
        })
      }
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/global/variables";

  .backyard-document-write {

    .document-write-block {

      background-color: white;
      box-shadow: 0 0 2px rgba(0, 0, 0, .2);
      border-radius: 5px;
      padding: 10px 15px 10px 15px;
      margin-bottom: 10px;

    }
  }
</style>
