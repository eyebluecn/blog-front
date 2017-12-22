<template>
	<div class="backyard-user-detail animated fadeIn ">
		<div class="row">
			<div class="col-md-12">
				<div class="pedia-navigation">
					<span class="item active" v-if="userLoaded">
						<span v-if="currentUser.uuid === user.uuid">个人详情</span>
						<span v-else>他的详情</span>
					</span>
				</div>
			</div>

			<div class="col-md-12 mt10">
				<div class="bg-white border br4 p10">
					<div class="media">
						<div class="pull-left">
							<img class="img-circle img-lg" :src="user.getAvatarUrl()">
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span>
									{{user.username}}
									<span v-if="user.uuid===currentUser.uuid"
									      class="text-danger">(It's you)</span>
								</span>
							</div>
							<div class="cell-content">
								<div class="mt5">
									{{user.getRoleName()}}
								</div>
								<div class="mt5">
									<i class="fa fa-envelope text-success"></i>
									{{user.email}}
								</div>
								<div class="mt5">
									<i class="fa fa-phone text-info"></i>
									{{user.phone}}
								</div>
								<div class="mt5 text-muted">
									{{user.description}}
								</div>
								<div class="mt5">
									<span class="mr10">上次登录: {{user.lastTime | humanTime}}</span>
									<span class="mr10">上次IP: {{user.lastIp}}</span>
								</div>
							</div>


						</div>

					</div>
					
					<div class="user-operation mt20 " :class="{'text-right':!$store.state.config.mobile}">
						<button class="btn btn-sm btn-primary" v-if="currentUser.hasPermission(FeatureType.USER_MANAGE)" @click.stop.prevent="resetPwd">重置密码</button>
						<router-link class="btn btn-sm btn-primary" v-if="user.uuid === currentUser.uuid" :to="'/by/user/change/password'">
							修改密码
						</router-link>
						<router-link class="btn btn-sm btn-primary" :to="'/by/user/edit/'+user.uuid">
							编辑
						</router-link>
					</div>

				</div>
			</div>

		</div>


	</div>
</template>

<script>
  import User from '../../common/model/user/User'
  import { MessageBox,Notification } from 'element-ui'
	import { FeatureType } from '../../common/model/feature/FeatureType'

  export default {
    name: 'detail',
	  data(){
      return{
        FeatureType,
	      userLoaded: false,
        currentUser: this.$store.state.user,
        user: new User()
      }
	  },
	  components:{

	  },
	  methods:{
		  refresh(){
		    let that = this
			  this.user.uuid = this.$store.state.route.params.uuid
			  if(this.user.uuid){
		      this.user.httpDetail(function (response) {
            that.userLoaded = true
          })
			  }
		  },
		  resetPwd(){
        let that = this
        MessageBox.prompt('输入新密码','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '新密码必填'
        }).then(({value}) => {
          that.user.httpUserResetPassword(value,function (response) {
            Notification.success({
              message:'重置密码成功！'
            })
          })
        }).catch(() => {
        })
		  }
	  },
	  mounted(){
		  this.refresh()
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>