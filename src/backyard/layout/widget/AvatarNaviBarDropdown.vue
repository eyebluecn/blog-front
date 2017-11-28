<template>

	<li class="dropdown" :class="{'open':open}" ref="dropdown" @mouseover="mouseOver" @mouseout="mouseOut"
	    @click="toggle">
		<a href="javascript:void(0)" @blur="loseFocus">
			<img alt="image" class="img-circle w30 h30" :src="user.getAvatarUrl()"/>
		</a>

		<AvatarDropdownUl ref="avatarDropdownUl" @mouseover="mouseOver" @mouseout="mouseOut"/>

	</li>


</template>

<script>

	import $ from "jquery";
	import AvatarDropdownUl from "./AvatarDropdownUl";

	export default {
		data () {
			return {
				user: this.$store.state.user,
				open: false,
				isInside: false
			}
		},
		props: {
			name: {
				type: String,
				required: false,
				"default"() {
					return ""
				}
			}
		},
		components: {
			AvatarDropdownUl
		},
		computed: {

			$dropdown(){
				return $(this.$refs.dropdown);
			}
		},
		methods: {
			toggle(){
				this.open = !this.open;
			},
			loseFocus(){

			},
			mouseOver(){
				let that = this;
				this.isInside = true;

				if (this.isInside) {
					this.open = true;
				}


			},
			mouseOut(){
				let that = this;
				this.isInside = false;

				setTimeout(function () {
					if (!that.isInside) {
						that.open = false;
					}
				}, 200);
			},
			logout(){
				this.user.logout();
				this.$router.push("/user/login");
			}
		},
		mounted(){
		}
	}
</script>
<style lang="less" rel="stylesheet/less">

</style>
