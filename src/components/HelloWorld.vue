<template>
  <div class="hello">

    <div class="apple">
      我是苹果
      <div class="orange">
        我是橘子
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .apple {
    color: red;
    .orange {
      color: orange;
    }
  }
</style>


