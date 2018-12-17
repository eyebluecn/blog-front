<template>
  <li class="menu-li" v-if="menu.children && menu.children.length">
    <a href="javascript:void(0)" @click.stop.prevent="menu.show = !menu.show">
      <i :class="'w14 fa '+menu.icon"></i>
      <span>{{menu.name}}</span>
      <i class="pull-right fa fa-angle-left" v-show="!menu.show"></i>
      <i class="pull-right fa fa-angle-down" v-show="menu.show"></i>
    </a>
    <NbExpanding>
      <ul class="sub-nav" v-show="menu.show">
        <li v-for="subMenu in menu.children">
          <router-link :to="subMenu.path" :class="{'custom-active':isCustomActive(subMenu.path)}">
            <span>{{subMenu.name}}</span>
          </router-link>
        </li>
      </ul>
    </NbExpanding>
  </li>
  <li class="menu-li" v-else>
    <router-link :to="menu.path" :class="{'custom-active':isCustomActive(menu.path)}">
      <i :class="'w14 fa '+menu.icon"></i>
      <span>{{menu.name}}</span>
    </router-link>
  </li>
</template>
<script>
  import NbExpanding from "../../../common/widget/NbExpanding";
  import Menu from "../../../common/frontend/Menu";

  //最多支持两级
  export default {
    data() {
      return {}
    },
    props: {
      menu: {
        type: Menu,
        required: true
      }
    },
    computed: {},
    watch: {},
    components: {
      NbExpanding
    },
    methods: {
      isCustomActive(path) {
        return this.$route.path === path
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

  @import "../../../assets/css/global/variables";

  //第一级菜单
  .menu-li {

    @nav-bg: #3A3F51;
    @nav-text-color: white;
    @font-highlight-color: #ddd;
    @left-border-color: @brand-primary;

    > a {

      color: @nav-text-color;

      padding: 12px 20px;

      i {
        margin-right: 6px;
      }

      //为什么要用custom-active? 因为 is-link-exact-active 不能匹配 /user/list 和 /user/list?page=0
      // is-link-active 会将 / 和 /preference 进行匹配。
      //所以用 is-link-exact-active 的话就会出现刷新列表页面时不高亮
      //用 is-link-active 时会两个高亮。
      &.custom-active {
        background-color: black;
        &:hover, &:focus {
          color: @font-highlight-color;
          background-color: black;
        }
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

          &.custom-active {
            background-color: black;
            &:hover, &:focus {
              color: @font-highlight-color;
              background-color: black;
            }
          }
        }
      }
    }
  }


</style>
