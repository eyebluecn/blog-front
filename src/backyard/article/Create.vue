<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!article.editMode">新建文章</span>
						<span v-show="article.editMode">编辑文章</span>
					</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <CreateSaveButton :entity="article" :callback="save"/>
      </div>
    </div>


    <LoadingFrame :loading="article.detailLoading">

      <div class="bg-white br4 p20 mt10">

        <div class="row" v-validator="article.validatorSchema.title.error">
          <label class="col-md-12 control-label mt5 compulsory">文章名称</label>
          <div class="col-md-12 validate">
            <input type="text" class="form-control" v-model="article.title">
          </div>
        </div>

        <div class="row" v-validator="article.validatorSchema.tags.error">
          <label class="col-md-12 control-label mt5 compulsory">标签</label>
          <div class="col-md-12 validate">
            <input type="text" class="form-control" v-model="article.tags">
          </div>
        </div>

        <div class="row">
          <label class="col-md-12 control-label mt5">封面图片</label>
          <div class="col-md-12">
            <input type="text" class="form-control" v-model="article.posterTankUuid">
          </div>
        </div>

        <div class="row">
          <label class="col-md-12 control-label mt5">封面图片Url</label>
          <div class="col-md-12">
            <input type="text" class="form-control" v-model="article.posterUrl">
          </div>
        </div>


        <div class="row">
          <label class="col-md-12 control-label mt5">作者</label>
          <div class="col-md-12">
            <input type="text" class="form-control" v-model="article.author">
          </div>
        </div>


        <div class="row">
          <label class="col-md-12 control-label mt5">私有文章</label>
          <div class="col-md-12">
            <NbCheckbox v-model="article.privacy"/>
          </div>
        </div>


        <div class="row">
          <label class="col-md-12 control-label mt5">置顶</label>
          <div class="col-md-12">
            <NbCheckbox v-model="article.top"/>
          </div>
        </div>


        <div class="row">
          <label class="col-md-12 control-label mt5">发布日期</label>
          <div class="col-md-12">
            <DatePicker
              v-model="article.releaseTime" type="datetime" placeholder="发布日期">
            </DatePicker>
          </div>
        </div>


        <div class="row">
          <label class="col-md-12 control-label mt5">摘要</label>
          <div class="col-md-12">
            <input type="text" class="form-control" v-model="article.digest">
          </div>
        </div>

        <div class="row">
          <label class="col-md-12 control-label mt5">Markdown格式</label>
          <div class="col-md-12 ">
            <NbCheckbox v-model="article.isMarkdown"/>
          </div>
        </div>

        <div class="row" v-validator="article.validatorSchema.content.error">
          <label class="col-md-12 control-label mt5 compulsory">内容</label>
          <div class="col-md-12 validate">
            <input type="text" class="form-control" v-model="article.content">
          </div>
        </div>



        <div class="row">
          <div class="col-md-12 m-t-md">
            <div class="alert alert-danger" v-show="article.errorMessage">
              {{article.errorMessage}}
            </div>
            <div>
              <CreateSaveButton :entity="article" :callback="save"/>
            </div>
          </div>
        </div>
      </div>


    </LoadingFrame>
  </div>
</template>
<script>

  import {simpleDateTime, str2Date} from '../../common/filter/time';
  import {Notification, MessageBox, DatePicker} from 'element-ui';
  import Article from '../../common/model/article/Article';
  import NbSlidePanel from '../../common/widget/NbSlidePanel.vue';
  import NbRadio from '../../common/widget/NbRadio.vue';
  import NbMarkdown from '../../common/widget/markdown/NbMarkdown';
  import NbCheckbox from '../../common/widget/NbCheckbox.vue';
  import CreateSaveButton from "../widget/CreateSaveButton.vue";
  import LoadingFrame from "../widget/LoadingFrame.vue";
  import $ from "jquery"

  export default {

    data() {
      return {
        user: this.$store.state.user,
        article: new Article()
      }
    },
    components: {
      DatePicker,
      CreateSaveButton,
      LoadingFrame,
      NbRadio,
      NbMarkdown,
      NbCheckbox,
      NbSlidePanel
    },
    computed: {},
    watch: {},
    methods: {

      save() {
        let that = this;
        this.article.errorMessage = null;
        this.article.httpSave(function (response) {
          Notification.success({
            message: that.article.editMode ? '修改文章成功！' : '创建文章成功！'
          });

          that.$router.push("/by/article/detail/" + that.article.uuid);
        });
      },
      fetchDetail() {
        let that = this;
        this.article.httpDetail();

      }
    },
    mounted() {
      let that = this;
      this.article.uuid = this.$store.state.route.params.uuid;
      if (this.article.uuid) {
        this.article.editMode = true;
        this.fetchDetail()
      }
    }
  }


</script>
