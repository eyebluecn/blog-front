<template>
  <div class="we-video">
    <div class="panel-tab">
      <div class="tab-container">
        <a href="javascript:void(0)" class="tab selected">插入视频</a>
      </div>
    </div>
    <div class="content-container">

      <div class="content network-content">
        <div class="input-block">
          <input type="text" class="block url-input" v-model="commonCode" placeholder="腾讯视频/优酷/爱奇艺等分享的通用代码">
        </div>
        <div class="alert pv5 mb5" :class="{'alert-info':!hasError,'alert-danger':hasError}">
          <i class="fa fa-bullhorn"></i>
          通用代码是以"&lt;iframe"开头,以"&lt;/iframe&gt;"结尾的一段代码，可以从视频页面的分享面板中获取。
        </div>
        <div class="text-right">
          <button class="gray" @click.stop.prevent="cancelFunc">取消</button>
          <button class="" @click.stop.prevent="insertFunc">插入</button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

  import {endWith, startWith} from "../../filter/str";

  export default {
    data() {
      return {
        commonCode: null,
        hasError: false
      }
    },
    computed: {},
    props: {
      //在这种模式下不能使用大写。非常奇怪
      insertcallback: {
        type: Function,
        required: true
      },
      cancelcallback: {
        type: Function,
        required: true
      }
    },

    components: {},
    watch: {},
    methods: {
      insertFunc() {

        if (startWith(this.commonCode, "<iframe") && endWith(this.commonCode, "</iframe>")) {
          this.hasError = false
          this.insertcallback(this.commonCode);
          this.commonCode = null;
        } else {
          this.hasError = true
        }

      },
      cancelFunc() {
        this.cancelcallback();
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .we-video {

    .upload-content {
      padding: 10px;
    }
    .network-content {
      .input-block {
        margin: 20px 10px 10px 10px;
      }
    }

  }

</style>




