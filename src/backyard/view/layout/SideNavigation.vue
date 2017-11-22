<template>
	<nav ref="menuNav" class="side-navigation" :class="{'show-drawer':showDrawer}" @click.stop.prevent="eatClick">
		<div class="sidebar-collapse">


			<div class="app-name-box" @click.stop.prevent="$router.push('/')">
				<router-link to="/">
					<img class="img-circle img-sm" src="../../../common/assets/img/logo-sm.jpg"/>
					<span class="f17 bold">筋斗云</span>
				</router-link>
			</div>


			<div class="menu-header">
				<div class="logo-area" @click="goToProfile">
					<img alt="image" class="img-circle w80" :src="member.getAvatarUrl()"/>
				</div>
				<div class="text-area">
					<div class="nickname">
						{{member.nickname}}
					</div>
					<div class="role">
						{{member.role.name}}
					</div>

				</div>
			</div>

			<ul class="nav mt20">
				<SideMenu v-for="(menu,index) in member.byMenus" :key="index" :menu="menu"/>

			</ul>

		</div>
	</nav>
</template>
<script>
	import {mapGetters} from 'vuex'
	import SideMenu from "./SideMenu.vue"
	import AvatarSideNaviDropdown from "./widget/AvatarSideNaviDropdown.vue";

	import PerfectScrollbar from "perfect-scrollbar";
	import "perfect-scrollbar/dist/css/perfect-scrollbar.css";
	import $ from "jquery";


	export default {

		data () {
			return {
				member: this.$store.state.member
			}
		},
		computed: {
			showDrawer () {
				return this.$store.state.config.showDrawer;
			},
			mobile () {
				return this.$store.state.config.mobile;
			}

		},

		components: {
			SideMenu,
			AvatarSideNaviDropdown
		},
		methods: {
			goToProfile(){
				this.$router.push("/by/member/profile/" + this.member.uuid);
			},
			eatClick(){

			},
			updateBody(){
				if (this.showDrawer && this.mobile) {
				} else {
				}
			}
		},
		watch: {
			"showDrawer"(newVal, oldVal){
				this.updateBody();
			},
			"mobile"(newVal, oldVal){
				this.updateBody();
			}

		},
		mounted(){
			let that = this;

			PerfectScrollbar.initialize(that.$refs.menuNav);

			this.updateBody();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">

	@import "../../../common/assets/css/global/variables";

	@nav-bg: #3A3F51;
	@nav-text-color: white;
	@font-highlight-color: #ddd;
	@left-border-color: @brand-primary;

	//大屏幕
	@media (min-width: @screen-lg-min) {
		.menu-header {
			display: none;
		}
	}

	//中屏幕
	@media (min-width: @screen-md-min) and (max-width: @screen-md-max) {
		.menu-header {
			display: none;
		}
	}

	//小屏幕
	@media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) {
		.menu-header {
			display: none;
		}
	}

	//手机屏幕
	@media (max-width: @screen-xs-max) {

	}

	//左侧菜单block.
	.side-navigation {

		overflow: auto;

		-webkit-transition: all 0.4s;
		-moz-transition: all 0.4s;
		-o-transition: all 0.4s;
		transition: all 0.4s;

		position: fixed;
		width: @sidebar-width;

		left: -@sidebar-width;
		top: 0;
		bottom: 0;
		z-index: 2000;

		background: darken(@nav-bg, 3%);

		&.show-drawer {
			left: 0;
		}

		.sidebar-collapse {
			padding-bottom: 40px;
		}

		.app-name-box {
			text-align: center;
			vertical-align: middle;
			display: table-cell;
			width: @sidebar-width;
			background-color: @brand-primary;
			height: @top-navigation-height;
			a {
				font-size: 16px;
				color: white;
			}
		}

		//放头像和用户名的地方。
		.menu-header {

			border-bottom: 1px solid #2F4458;
			.logo-area {
				cursor: pointer;
				text-align: center;
				padding: 20px 0;
			}

			.text-area {
				.nickname {
					text-align: center;
					color: @nav-text-color;
					font-weight: bold;
				}
				.role {
					text-align: center;
					color: @nav-text-color;
				}
			}

		}

		//分割线
		.separate-line {
			margin-top: 20px;
			padding-bottom: 5px;
			border-bottom: 1px solid #666666;

			span {
				margin-left: 20px;
				color: #777;
			}
		}

		.nav {
			li {

				&.active {

					//只有紧接的这一层a才会高亮。
					> a {
						color: @font-highlight-color;
					}
				}

				a {

					color: @nav-text-color;

					padding: 12px 20px;
					&:hover, &:focus {
						color: @font-highlight-color;
						background-color: transparent;
					}

					i {
						margin-right: 6px;
					}
				}
			}

			.nav-first-level {
				&.active {
				}
				&.current {
					background-color: black;
				}
			}
			&.nav-second-level {

				> li {

					> a {
						padding-left: 43px;
					}
					&.active {
						border: none;
					}
					&.current {
						background-color: black;
					}
				}
			}
			&.nav-third-level {

				> li {
					> a {
						padding-left: 57px;
					}
					&.current {
						background-color: black;
					}
				}
			}
		}
	}


</style>
