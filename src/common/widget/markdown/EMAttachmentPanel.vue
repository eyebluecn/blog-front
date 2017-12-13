<template>
  <div>
    <NbTank :tank="tank"/>
  </div>
</template>

<script>

  import NbTank from "../NbTank"
  import Tank from "../../model/tank/Tank"

  export default {
    data() {
      return {
        tank: new Tank('*', false, 1024 * 1024 * 1024, "附件最大不超过1G")
      }
    },
    props: {
      successCallback: {
        type: Function,
        required: false
      }
    },
    watch: {
      "tank.url"(newVal, oldVal) {
        if (typeof this.successCallback === "function") {
          this.successCallback(this.tank)
        }
      }
    },
    components: {
      NbTank
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">


</style>


