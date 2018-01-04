<template>
  <div class="top-navigation-bar">
    <nav class="navbar">


      <div class="navbar-title">

        <router-link to="/">
          <img class="w40" src="../../assets/img/logo.png"/>
          <span class="f18 black bold">蓝眼博客管理后台</span>
        </router-link>

      </div>

      <button class="drawer-trigger btn btn-primary btn-sm"
              @click.stop.prevent="$store.state.config.showDrawer=!$store.state.config.showDrawer">
        <i class="fa fa-bars"></i>
      </button>


    </nav>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        user: this.$store.state.user
      }
    },
    components: {

    },
    methods: {}
  }
</script>


<style lang="less" rel="stylesheet/less">

  @import "../../assets/css/global/variables";

  //上方的导航栏
  .top-navigation-bar {

    height: @top-navigation-height;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding-left: @sidebar-width;

    //手机屏幕
    @media (max-width: @screen-xs-max) {
      padding-left: 0;
    }

    .navbar-title {
      float: left;
      cursor: pointer;
      padding-top: 3px;

      @media (min-width: 768px) {
        margin-top: 5px;
        margin-left: 10px;
      }
      @media (max-width: 768px) {
        margin-top: 5px;
        margin-left: 10px;
      }

      .logo-img {
        height: 30px;
      }

      .logo-title {
        line-height: 30px;
        font-size: 13px;
        color: #778195;

        //手机屏幕
        @media (max-width: @screen-xs-max) {
          //display: none;
          font-size: 12px;
        }
      }

    }

    .login-trigger {
      float: right;
      margin-right: 10px;
      .login-span, .register-span {
        color: #888;
        cursor: pointer;
        font-size: 14px;
        line-height: 40px;

        &:hover {
          color: black;
          text-decoration: underline;
        }
      }
    }

    .drawer-trigger {
      float: right;
      margin-top: 5px;
      margin-right: 5px;
    }

    .navbar-right {

      > li {
        display: inline-block;
        &:last-child {
          margin-right: 5px;
        }
        a {
          color: #999c9e;
          font-size: 14px;
          padding: 6px 12px;
        }

      }

      @media (min-width: 768px) {
        float: right !important;
        margin-right: 0;
      }

      .message-info {
        position: relative;

        .label {

          line-height: 12px;
          padding: 2px 5px;
          position: absolute;
          left: 10%;
          bottom: 50%;

        }
      }
    }

    //小屏幕
    @media (min-width: @screen-sm-min) {
      .drawer-trigger {
        display: none;
      }
    }
    //手机屏幕
    @media (max-width: @screen-xs-max) {

      .navbar-right {
        display: none;
      }
    }

  }


</style>
