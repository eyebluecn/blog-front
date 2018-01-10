<template>
  <nav ref="menuNav" class="side-navigation" :class="{'show-drawer':showDrawer}" @click.stop.prevent="eatClick">
    <div class="sidebar-collapse">

      <div class="menu-header" @click="goToProfile">
        <div class="logo-area">
          <img alt="image" class="img-circle w80" :src="user.getAvatarUrl()"/>
        </div>
        <div class="text-area">
          <div class="nickname">
            {{user.role === 'GUEST' ? '请登录' : user.username}}
          </div>
        </div>
      </div>

      <ul class="nav mt20">

        <li v-if="!user.hasPermission(FeatureType.USER_MINE)">
          <router-link to="/by/user/login">
            <i class="w14 fa fa-user-circle-o"></i>
            <span>登录</span>
          </router-link>
        </li>

        <li v-if="user.hasPermission(FeatureType.USER_MINE)">
          <router-link to="/by">
            <i class="w14 fa fa-book"></i>
            <span>文章列表</span>
          </router-link>
        </li>


        <li v-if="user.hasPermission(FeatureType.USER_MINE)">
          <router-link to="/by/tag/list">
            <i class="w14 fa fa-tags"></i>
            <span>标签列表</span>
          </router-link>
        </li>

        <li v-if="user.hasPermission(FeatureType.USER_MANAGE)">
          <router-link to="/by/preference">
            <i class="w14 fa fa-dashboard"></i>
            <span>网站偏好</span>
          </router-link>
        </li>

        <li v-if="user.hasPermission(FeatureType.USER_MANAGE)">
          <router-link to="/by/user/list">
            <i class="w14 fa fa-user"></i>
            <span>用户列表</span>
          </router-link>
        </li>


        <li v-if="user.hasPermission(FeatureType.USER_MANAGE)">
          <router-link to="/by/report/list">
            <i class="w14 fa fa-warning"></i>
            <span>举报列表</span>
          </router-link>
        </li>


        <li>
          <a href="/" @click.stop.prevent="goHome">
            <i class="w14 fa fa-home"></i>
            <span>网站前台</span>
          </a>
        </li>

        <li v-if="user.hasPermission(FeatureType.USER_MINE)">
          <router-link to="/by/user/login">
            <i class="w14 fa fa-power-off"></i>
            <span>退出登录</span>
          </router-link>
        </li>


      </ul>

    </div>
  </nav>
</template>
<script>
  import {FeatureType} from "../../common/model/feature/FeatureType";


  export default {

    data() {
      return {
        FeatureType,
        user: this.$store.state.user
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

    components: {},
    methods: {
      goToProfile() {

        if (!this.user.uuid) {
          this.$router.push("/by/user/login");
        } else {
          this.$router.push("/by/user/detail/" + this.user.uuid);
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
      }
    },
    watch: {
      "showDrawer"(newVal, oldVal) {
        this.updateBody();
      },
      "mobile"(newVal, oldVal) {
        this.updateBody();
      }

    },
    mounted() {
      let that = this;

      this.updateBody();
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
      li {

        a {

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
      }

    }
  }


</style>
