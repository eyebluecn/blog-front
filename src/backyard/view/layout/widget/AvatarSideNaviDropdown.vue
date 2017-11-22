<template>
	<div ref="dropdown" class="widget-dropdown btn-group" :class="{'open':open}"
	     @mouseover="mouseOver" @mouseout="mouseOut" @click="toggle">
		<button @blur="loseFocus">
			{{name}}
			<span class="caret"></span>
		</button>
		<AvatarDropdownUl/>
	</div>
</template>

<script>

	import $ from "jquery";

	import AvatarDropdownUl from "./AvatarDropdownUl";

	export default {
		data () {
			return {
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
		computed: {

			$dropdown(){
				return $(this.$refs.dropdown);
			}
		},
		components: {
			AvatarDropdownUl
		},
		methods: {
			toggle(){
				this.open = !this.open;
			},
			loseFocus(){
				if (!this.isInside) {
					this.open = false;
				}
			},
			mouseOver(){
				this.isInside = true;
			},
			mouseOut(){
				this.isInside = false;
			}
		},
		mounted(){

			this.$dropdown.find("ul").addClass("dropdown-menu");

		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	.widget-dropdown {
		button {
			background: transparent;
			color: #a7b1c2;
			border: none;

			&:active, &:focus {
				border: none;
				outline: none;
			}
		}
		.dropdown-menu {
			left: -18px;
		}
	}
</style>
