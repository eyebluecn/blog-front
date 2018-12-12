<template>
  <nav ref="menuNav" class="side-navigation" :class="{'show-drawer':showDrawer}" @click.stop.prevent="eatClick">
    <div class="sidebar-collapse">

      <div class="menu-header" @click="goToProfile">
        <div class="logo-area">
          <img alt="image" class="img-circle w80" :src="handleImageUrl(user.avatarUrl)"/>
        </div>
        <div class="text-area">
          <div class="nickname">
            {{user.role === 'GUEST' ? '请登录' : user.nickname}}
          </div>
        </div>
      </div>

      <ul class="nav mt20">

        <MenuPanel v-for="(menu,index) in menus" :key="index" :menu="menu"/>

      </ul>

    </div>
  </nav>
</template>
<script>
  import {FeatureType} from "../../common/model/core/FeatureType";
  import NbExpanding from "../../common/widget/NbExpanding";
  import MenuPanel from "./widget/MenuPanel"
  import Menu from "../../common/frontend/Menu";
  import {handleImageUrl} from "../../common/util/ImageUtil";


  export default {

    data() {
      return {
        FeatureType,
        user: this.$store.state.user,
        //表单维护
        formShow: true,
        menus: []
      }
    },
    computed: {
      showDrawer() {
        return this.$store.state.config.showDrawer;
      },
      mobile() {
        return this.$store.state.config.mobile;
      }

    },

    components: {
      NbExpanding,
      MenuPanel
    },
    methods: {
      handleImageUrl,
      goToProfile() {

        if (!this.user.uuid) {
          this.$router.push("/by/user/login");
        } else {
          this.$router.push("/by/user/profile/detail/" + this.user.uuid);
        }


      },
      eatClick() {
        console.info("eat click")
      },
      goHome() {
        window.open("/")
      },

      updateBody() {
        if (this.showDrawer && this.mobile) {
        } else {
        }
      },
      updateMenus() {

        this.menus.splice(0, this.menus.length);


        if (!this.user.hasPermission(FeatureType.USER_MINE)) {
          this.menus.push(new Menu("登录", "/by/user/login", "fa-user-circle-o"))
        }

        if (this.user.hasPermission(FeatureType.USER_MINE)) {
          this.menus.push(new Menu("文章管理", "/by", "fa-book"))
        }

        if (this.user.hasPermission(FeatureType.USER_MINE)) {
          this.menus.push(new Menu("文档管理", "/by/document/list", "fa-cubes"))
        }


        if (this.user.hasPermission(FeatureType.USER_MINE)) {
          this.menus.push(new Menu("标签列表", "/by/tag/list", "fa-tags"))
        }

        if (this.user.hasPermission(FeatureType.USER_MANAGE)) {
          this.menus.push(new Menu("网站偏好", "/by/preference", "fa-dashboard"))
        }

        if (this.user.hasPermission(FeatureType.USER_MANAGE)) {
          this.menus.push(new Menu("用户列表", "/by/user/list", "fa-user"))
        }


        if (this.user.hasPermission(FeatureType.USER_MANAGE)) {
          this.menus.push(new Menu("举报列表", "/by/report/list", "fa-warning"))
        }


        if (this.user.hasPermission(FeatureType.USER_MANAGE)) {
          this.menus.push(new Menu("网站前台", "/", "fa-home"))
        }

        if (this.user.hasPermission(FeatureType.USER_MINE)) {
          this.menus.push(new Menu("退出登录", "/by/user/login", "fa-power-off"))
        }

      }
    },
    watch: {
      "showDrawer"(newVal, oldVal) {
        this.updateBody();
      },
      "mobile"(newVal, oldVal) {
        this.updateBody();
      },
      "user.userRoleUuid"() {
        console.log("user.userRoleUuid变化", this.user.userProfileUuid)
        this.updateMenus()
      }

    },
    mounted() {
      let that = this;

      this.updateBody();

      this.updateMenus();

    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  @import "../../assets/css/global/variables";

  @nav-bg: #3A3F51;
  @nav-text-color: white;
  @font-highlight-color: #ddd;
  @left-border-color: @brand-primary;

  //手机屏幕
  @media (max-width: @screen-xs-max) {

  }

  //左侧菜单block.
  .side-navigation {

    overflow: auto;

    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;

    position: fixed;
    width: @sidebar-width;

    left: -@sidebar-width;
    top: 0;
    bottom: 0;
    z-index: 1050;

    background: darken(@nav-bg, 3%);

    &.show-drawer {
      left: 0;
    }

    .sidebar-collapse {
      padding-bottom: 40px;
    }

    .app-name-box {
      text-align: center;
      vertical-align: middle;
      display: table-cell;
      width: @sidebar-width;
      background-color: @brand-primary;
      height: @top-navigation-height;
      a {
        font-size: 16px;
        color: white;
      }
    }

    //放头像和用户名的地方。
    .menu-header {
      cursor: pointer;
      .logo-area {

        text-align: center;
        padding: 20px 0;
      }

      .text-area {
        .nickname {
          text-align: center;
          color: @nav-text-color;
          font-weight: bold;
        }
        .role {
          text-align: center;
          color: @nav-text-color;
        }
      }

    }

    //分割线
    .separate-line {
      margin-top: 20px;
      padding-bottom: 5px;
      border-bottom: 1px solid #666666;

      span {
        margin-left: 20px;
        color: #777;
      }
    }

    .nav {
      //第一级菜单
      > li {
        > a {

          color: @nav-text-color;

          padding: 12px 20px;
          &:hover, &:focus {
            color: @font-highlight-color;
            background-color: transparent;
          }

          i {
            margin-right: 6px;
          }

          &.router-link-exact-active {
            background-color: black;
          }
        }

        .sub-nav {
          padding: 0;
          margin: 0;
          > li {

            list-style: none;

            > a {
              display: inline-block;
              width: 100%;
              color: @nav-text-color;
              padding: 12px 20px 12px 43px;
              &:hover, &:focus {
                color: @font-highlight-color;
                background-color: transparent;
              }

              &.router-link-exact-active {
                background-color: black;
              }
            }
          }
        }
      }

    }
  }


</style>
