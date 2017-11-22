<template>
	<div class="top-navigation-bar">
		<nav class="navbar">


			<div class="navbar-title">

				<router-link to="/">
					<span class="f18 black bold">超级后台管理系统</span>
				</router-link>


			</div>

			<ul class="nav navbar-right">

				<!--通知按钮先隐藏-->
				<li v-if="false">
					<a class="message-info" href="javascript:void(0)"
					   @click.stop.prevent="$router.push('/by/message/remind/list')">
						<i class="fa fa-bell"></i>
						<span class="label label-warning">12</span>
					</a>
				</li>

				<!--通知按钮先隐藏-->
				<li v-if="false">
					<a class="message-info" href="javascript:void(0)"
					   @click.stop.prevent="$router.push('/by/message/letter/list/inbox')">
						<i class="fa fa-envelope"></i>
						<span class="label label-primary">10</span>
					</a>
				</li>

				<li is="AvatarNaviBarDropdown" v-if="member.isLogin"></li>

			</ul>


			<button class="drawer-trigger btn btn-primary btn-sm"
			        @click.stop.prevent="$store.state.config.showDrawer=!$store.state.config.showDrawer">
				<i class="fa fa-bars"></i>
			</button>

			<span class="login-trigger" v-if="!member.isLogin">
				<span class="login-span" @click.stop.prevent="$router.push('/member/login')">登录</span>
				/
				<span class="register-span" @click.stop.prevent="$router.push('/member/login')">注册</span>
			</span>


		</nav>
	</div>
</template>
<script>
  import AvatarNaviBarDropdown from './widget/AvatarNaviBarDropdown.vue'
  import Dropdown from './widget/AvatarSideNaviDropdown'

  export default {
    data () {
      return {
        member: this.$store.state.member
      }
    },
    components: {
      AvatarNaviBarDropdown,
      Dropdown
    },
    methods: {

    }
  }
</script>


<style lang="less" rel="stylesheet/less">

	@import "../../../common/assets/css/global/variables";

	//上方的导航栏
	.top-navigation-bar {

		height: @top-navigation-height;
		background-color: white;
		border-bottom: 1px solid #eeeeee;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		padding-left: @sidebar-width;

		//手机屏幕
		@media (max-width: @screen-xs-max) {
			padding-left: 0;
		}

		.navbar-title {
			float: left;
			cursor: pointer;
			padding-top: 3px;

			@media (min-width: 768px) {
				margin-top: 5px;
				margin-left: 10px;
			}
			@media (max-width: 768px) {
				margin-top: 5px;
				margin-left: 10px;
			}

			.logo-img {
				height: 30px;
			}

			.logo-title {
				line-height: 30px;
				font-size: 13px;
				color: #778195;

				//手机屏幕
				@media (max-width: @screen-xs-max) {
					//display: none;
					font-size: 12px;
				}
			}

		}

		.login-trigger {
			float: right;
			margin-right: 10px;
			.login-span, .register-span {
				color: #888;
				cursor: pointer;
				font-size: 14px;
				line-height: 40px;

				&:hover {
					color: black;
					text-decoration: underline;
				}
			}
		}

		.drawer-trigger {
			float: right;
			margin-top: 5px;
			margin-right: 5px;
		}

		.navbar-right {

			> li {
				display: inline-block;
				&:last-child {
					margin-right: 5px;
				}
				a {
					color: #999c9e;
					font-size: 14px;
					padding: 6px 12px;
				}

			}

			@media (min-width: 768px) {
				float: right !important;
				margin-right: 0;
			}

			.message-info {
				position: relative;

				.label {

					line-height: 12px;
					padding: 2px 5px;
					position: absolute;
					left: 10%;
					bottom: 50%;

				}
			}
		}

		//小屏幕
		@media (min-width: @screen-sm-min) {
			.drawer-trigger {
				display: none;
			}
		}
		//手机屏幕
		@media (max-width: @screen-xs-max) {

			.navbar-right {
				display: none;
			}
		}

	}


</style>
