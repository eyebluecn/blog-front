<template>
  <div class="animated fadeIn document-detail">

    <div class="upper-box">
      <div class="pedia-navigation">
        <span class="item active">文档详情</span>
        <span class="tool">
              <router-link class="btn btn-primary btn-sm" to="/by/article/create">
                <i class="fa fa-plus"></i>
                创建文章
              </router-link>
              <router-link class="btn btn-primary btn-sm" :to="'/by/document/design/'+document.uuid">
                <i class="fa fa-list-ol"></i>
                设计目录
              </router-link>
              <router-link class="btn btn-primary btn-sm" :to="'/by/document/edit/'+document.uuid">
                <i class="fa fa-cubes"></i>
                编辑文档
              </router-link>
          </span>
      </div>
    </div>
    <div class="document-block">

      <div class="title">
        {{document.title}}
      </div>
      <div class="digest">
        {{document.digest}}
      </div>
      <div class="author">
        <div>
          <img :src="handleImageUrl(document.user.avatarUrl)"/>
        </div>
        <div>
          <router-link :to="'/by/user/detail/'+document.user.uuid">
            {{document.user.nickname}}
          </router-link>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
          <IndexFrame :document="document"/>
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
  import Article from "../../common/model/article/Article";
  import {currentHost} from "../../common/util/Utils";
  import IndexFrame from "./widget/detail/IndexFrame"
  import {handleImageUrl} from "../../common/util/ImageUtil";

  export default {

    data() {
      return {
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
    watch: {
      "$store.state.route.params.documentUuid"() {
        console.log("变化了啊")
        this.refresh()
      }
    },
    components: {
      NbSwitcher,
      NbRadio,
      NbTank,
      CreateSaveButton,
      IndexFrame
    },
    methods: {
      handleImageUrl,
      refineBreadcrumb() {
        let that = this;
        //整理面包屑
        that.breadcrumbs.forEach(function (breadcrumb) {
          if (breadcrumb.name === "DocumentDetail") {
            breadcrumb.title = that.document.title
          }
        })
      },
      refresh() {
        let that = this
        this.document.uuid = this.$store.state.route.params.documentUuid
        if (this.document.uuid) {
          this.document.httpDetail(function () {
            that.refineBreadcrumb()
          })
        }
      }
    },
    created() {

    },
    mounted() {
      this.refresh()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .document-detail {

    .document-block {
      background-color: white;
      box-shadow: 0 0 2px rgba(0, 0, 0, .2);
      border-radius: 5px;
      padding: 20px 15px 10px 15px;
      margin-top: 10px;
      margin-bottom: 30px;

      .title {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        color: black;

      }
      .digest {
        text-align: center;
        font-size: 14px;
        margin: 15px;
      }

      .author {
        text-align: center;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }

  }
</style>
