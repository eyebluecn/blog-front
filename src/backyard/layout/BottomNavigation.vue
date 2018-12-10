<template>
	<div class="bottom-navigation text-center">
		<span class="mr10">
			<span>{{preference.name}}</span>
		</span>
		<span class="mr10">
			<span>&copy; 版权所有</span>
		</span>

  </div>
</template>
<script>
  export default {
    name: 'bottom-navigation',
    data(){
      return{
        preference: this.$store.state.preference
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
	@import "../../assets/css/global/variables";

	.bottom-navigation{
		position: fixed;
		height: @power-footer-height;
		line-height: @power-footer-height;
		bottom: 0;
		right: 0;
		z-index: 1000;
		left: @sidebar-width;
		padding: 0 20px;
		border-top: 1px solid #eee;
		//大屏幕
		@media (min-width: @screen-sm-min) {
			left: @sidebar-width;
		}
		//小屏幕
		@media (max-width: @screen-xs-max) {
			left: 0;
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
