<template>
  <li v-if="menu.children && menu.children.length">
    <a href="javascript:void(0)" @click.stop.prevent="menu.show = !menu.show">
      <i :class="'w14 fa '+menu.icon"></i>
      <span>{{menu.name}}</span>
      <i class="pull-right fa fa-angle-left" v-show="!menu.show"></i>
      <i class="pull-right fa fa-angle-down" v-show="menu.show"></i>
    </a>
    <NbExpanding>
      <ul class="sub-nav" v-show="menu.show">
        <li v-for="subMenu in menu.children">
          <router-link :to="subMenu.path">
            <span>{{subMenu.name}}</span>
          </router-link>
        </li>
      </ul>
    </NbExpanding>
  </li>
  <li v-else>
    <router-link :to="menu.path">
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
      return {

      }
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
    methods: {}
  }
</script>


<style lang="less" rel="stylesheet/less">

  @import "../../../assets/css/global/variables";


</style>
