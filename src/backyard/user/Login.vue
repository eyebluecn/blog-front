<template>
  <div class="row">

    <div class="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 mt100">
      <div class="text-primary f25 text-center mb20">欢迎登录</div>
      <!--输入框开始-->
      <div class="input-group mb15">
        <span class="input-group-addon"><i class="fa fa-user w14"></i></span>
        <input type="email" class="form-control" placeholder="邮箱" v-model="user.phone"
               @keyup.enter="login">
      </div>
      <div class="input-group mb15">
        <span class="input-group-addon"><i class="fa fa-unlock-alt w14"></i></span>
        <input type="password" class="form-control" placeholder="密码" v-model="user.localPassword"
               @keyup.enter="login">
      </div>

      <div>
        <button class="btn btn-primary button full-width" @click.prevent.stop="login">
          <i class="fa fa-user-circle-o"></i>
          登录
        </button>

      </div>


    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: this.$store.state.user
      }
    },
    props: {},
    watch: {},
    computed: {},
    components: {},
    methods: {
      login() {

      }
    },
    mounted() {

    }


  }

</script>

<style lang="less" rel="stylesheet/less">

</style>


