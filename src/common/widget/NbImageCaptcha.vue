<template>

  <span class="nb-image-captcha">
      <img class="cursor w80" :src="captcha.blobUrl" @click.stop.prevent="refresh"/>
      <span class="text-danger" v-if="captcha.errorMessage">{{captcha.errorMessage}}</span>
  </span>

</template>

<script>
  import Captcha from "../model/validation/ImageCaptcha";
  export default {
    data () {
      return {
        captcha:new Captcha()
      }
    },
    components: {},
    watch: {

    },
    props: {

    },
    methods: {
      refresh(){
        let that = this;
        this.captcha.httpCaptcha();
      }
    },
    mounted(){
      this.refresh();
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

  .nb-image-captcha{
    .form-control{
      width:150px !important;
    }
  }

</style>


