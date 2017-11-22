<template>

	<ul class="dropdown-menu">
		<li>
			<a href="javascript:void(0)" @click.prevent="$router.push('/by/index')">
				<i class="fa fa-cogs w20 text-center"></i>
				首页
			</a>
		</li>
		<li>
			<a href="javascript:void(0)" @click.prevent="$router.push('/by/member/profile/' + member.uuid + '/campus')">
				<i class="fa fa-user-circle w20 text-center"></i>
				个人中心
			</a>
		</li>
		<li>
			<a href="javascript:void(0)" @click.prevent="$router.push('/entrance/:hierarchy')">
				<i class="fa fa-envelope-o w20 text-center"></i>
				校区管理系统
			</a>
		</li>
		<li class="divider"></li>
		<li>
			<a href="javascript:void(0)" @click.prevent="logout()">
				<i class="fa fa-power-off w20 text-center"></i>
				退出
			</a>
		</li>
	</ul>


</template>

<script>

  export default {
    data () {
      return {
        member: this.$store.state.member
      }
    },
    props: {},
    computed: {},
    methods: {
      logout () {
        this.member.httpLogout()
        this.$router.push('/member/login')
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less" rel="stylesheet/less">

</style>
