<template>
  <div class="nb-check-radio">
    <input ref="check" type="radio" :name="name" :value="val" :disabled="disabled">
  </div>
</template>

<script>


  import $ from "jquery"
  import iCheck from "../fork/icheck/icheck-vue"
  //css
  //import "icheck/skins/square/green.css";
  import "icheck/skins/square/blue.css";
  //import "../fork/icheck/blue.css";

  iCheck($);

  export default {
    data() {
      return {}
    },
    props: {
      value: {
        type: [String, Number, Boolean],
        required: false,
        "default": null
      },
      val: {
        type: [String, Number, Boolean],
        required: true,
        "default": null
      },
      name: {
        type: String,
        required: true,
        "default": null
      },
      disabled: {
        type: Boolean,
        required: false,
        "default": false
      }
    },
    computed: {
      $check() {
        return $(this.$refs.check);
      }
    },
    watch: {
      "value"() {
        this.refresh();
      },
      "val"() {
        this.refresh();
      },
      "disabled"() {
        this.refresh();
      }
    },
    methods: {
      refresh() {
        let state = this.value === this.val ? "check" : "uncheck";
        this.$check.iCheck(state);

        //改变disabled状态
        this.$check.iCheck(this.disabled ? 'disable' : 'enable');
      }
    },
    mounted() {
      let that = this;
      this.$check.iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue'
      });
      this.refresh();

      this.$check.on('ifChecked', function (event) {

        that.$emit('input', that.val);
      });

    }
  }
</script>

<style lang="less" rel="stylesheet/less">


  .nb-check-radio {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    width: 22px;
    height: 22px;
    border: none;
  }
</style>




