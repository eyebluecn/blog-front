<template>

  <div id="body">

    <div>
      <SideNavigation/>
      <div id="page-wrapper" :class="{'show-drawer':$store.state.config.showDrawer}" @click="blankClick">
        <div class="breadcrumb-box">
          <router-link to="/by" v-if="$store.state.breadcrumbs && $store.state.breadcrumbs.length">
            <i class="fa fa-home f16"></i>
          </router-link>
          <span v-for="b in $store.state.breadcrumbs">
              <span>/</span>
							<router-link v-if="b.name !== $store.state.route.name" :to="b">
                {{b.title}}
              </router-link>
							<span v-if="b.name === $store.state.route.name">
								{{b.title}}
							</span>
            </span>
        </div>
        <div class="content-box">
          <router-view></router-view>
        </div>
      </div>

      <TopNavigation/>
      <BottomNavigation/>
    </div>
  </div>


</template>

<script>
  import SideNavigation from './layout/SideNavigation.vue'
  import TopNavigation from './layout/TopNavigation.vue'
  import BottomNavigation from './layout/BottomNavigation.vue'
  import enquire from 'enquire.js/dist/enquire'

  export default {
    data() {
      return {
        member: this.$store.state.member
      }
    },
    computed: {
      config() {
        return this.$store.state.config
      }
    },
    components: {
      SideNavigation,
      TopNavigation,
      BottomNavigation
    },
    methods: {
      blankClick() {
        if (this.config.mobile) {
          if (this.config.showDrawer) {
            this.$store.state.config.showDrawer = false
          }
        }
      },
      listenResponsiveEvent() {
        let that = this
        enquire.register('(max-width: 768px)', {
          match: function () {
            that.$store.state.config.mobile = true
          },
          unmatch: function () {
            that.$store.state.config.showDrawer = true
            that.$store.state.config.mobile = false
          }
        })
      }
    },
    created() {

    },
    mounted() {
      let that = this
      this.$store.state.environment = 'backyard'
      this.listenResponsiveEvent()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../assets/css/global/variables";

  #page-wrapper {

    position: fixed;
    left: @sidebar-width;
    top: @top-navigation-height;
    right: 0;
    bottom: @power-footer-height;
    z-index: 1051;

    transition: all 0.4s;

    background-color: #f3f3f4;
    flex-direction: column;

    display: flex;

    .breadcrumb-box {
      padding: 5px 10px;
      border-bottom: 1px solid #eee;
    }

    .content-box {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;

      > div {
        padding: 10px;
      }

    }

    //大屏幕
    @media (min-width: @screen-sm-min) {
      left: @sidebar-width;
      z-index: 1051;
    }
    //小屏幕
    @media (max-width: @screen-xs-max) {
      left: 0;
      z-index: 1001;
    }

    &.show-drawer {
      //大屏幕
      @media (min-width: @screen-sm-min) {
        left: @sidebar-width;
      }

      //小屏幕
      @media (max-width: @screen-xs-max) {
        left: 0;
      }
    }

  }

</style>
