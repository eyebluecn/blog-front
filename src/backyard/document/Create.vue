<template>
  <div class="animated fadeIn document-edit-create">

    <div class="row">

      <div class="col-lg-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!document.editMode">创建文档</span>
						<span v-show="document.editMode">编辑文档</span>
					</span>
        </div>
      </div>

      <div class="col-xs-12">
        <div class="bg-white br4 border p10">

          <div class="row"
               v-validator="document.documentValidatorSchema.title.error">
            <label class="col-md-2 control-label mt5 compulsory">标题</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="document.title">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">封面图片</label>
            <div class="col-md-10">
              <NbTank :tank="document.posterTank"/>
            </div>
          </div>

          <div class="row mt10"
               v-validator="document.documentValidatorSchema.digest.error">
            <label class="col-md-2 control-label mt5 compulsory">摘要</label>
            <div class="col-md-10 validate">
              <textarea rows="3" class="form-control" v-model="document.digest"></textarea>
            </div>
          </div>

          <div class="row mt10"
               v-validator="document.documentValidatorSchema.path.error">
            <label class="col-md-2 control-label mt5 compulsory">路径</label>
            <div class="col-md-10">
              <span class="url-prefix">{{urlPrefix}}</span>
              <span class="validate">
                <input type="text" class="form-control path-input" v-model="document.path">
              </span>
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">文档私有</label>
            <div class="col-md-10">
              <NbSwitcher v-model="document.privacy" type="primary"></NbSwitcher>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-12">
              <CreateSaveButton :entity="document" :callback="save"></CreateSaveButton>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {FeatureType} from '../../common/model/core/FeatureType'
  import NbSwitcher from '../../common/widget/NbSwitcher.vue'
  import NbRadio from '../../common/widget/NbRadio.vue'
  import NbTank from '../../common/widget/NbTank.vue'
  import CreateSaveButton from '../widget/CreateSaveButton'
  import {UserRole, UserRoleList, UserRoleMap} from "../../common/model/user/UserRole";
  import {UserGender, UserGenderList, UserGenderMap} from "../../common/model/user/UserGender";
  import Article from "../../common/model/article/Article";
  import {simpleDate} from "../../common/filter/time";
  import {currentHost} from "../../common/util/Utils";
  import {ArticleType} from "../../common/model/article/ArticleType";

  export default {

    data() {
      return {
        UserRole,
        UserRoleMap,
        UserRoleList,
        UserGender,
        UserGenderList,
        UserGenderMap,
        FeatureType,
        user: this.$store.state.user,
        breadcrumbs: this.$store.state.breadcrumbs,
        document: new Article()
      }
    },
    computed: {
      urlPrefix() {
        return currentHost() + "/a/" + this.user.username + "/"
      }
    },
    components: {
      NbSwitcher,
      NbRadio,
      NbTank,
      CreateSaveButton
    },
    methods: {
      save() {
        let that = this

        this.document.posterTankUuid = this.document.posterTank.uuid
        this.document.posterUrl = this.document.posterTank.url
        this.document.type = ArticleType.DOCUMENT

        this.document.httpSaveDocument(function (response) {
          that.$message.success({
            message: that.document.editMode ? "修改成功！" : "创建成功！"
          })
          that.$router.go(-1)
        })
      }
    },
    created() {

    },
    mounted() {
      let that = this
      this.document.errorMessage = null
      this.document.uuid = this.$store.state.route.params.uuid
      if (this.document.uuid) {
        this.document.httpDetail()
      } else {
        //初始化路径，默认用今天的日期。
        this.document.path = simpleDate(new Date())
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .document-edit-create {
    .url-prefix {
      font-size: 15px;
      display: inline-block;
    }
    .path-input {
      display: inline-block;
      width: 150px;
    }

  }
</style>
