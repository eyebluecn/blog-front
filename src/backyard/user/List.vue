<template>
	<div class="backyard-user-list animated fadeIn">
		<div class="row">
			<div class="col-lg-12">
				<div class="pedia-navigation">
					<span class="item active">文章列表</span>
				</div>
			</div>
		</div>

    <div class="row">
      <div class="col-lg-8 col-lg-offset-2">
        <NbFilter :filters="pager.filters" :callback="search">
          <router-link class="btn btn-primary btn-sm" to="/by/user/create">
            <i class="fa fa-plus"></i>
            创建用户
          </router-link>
        </NbFilter>
      </div>

      <div class="col-lg-8 col-lg-offset-2" v-for="(u,index) in pager.data">
        <div class="bg-white border br4 p10 mb10">
          <div class="media">
            <div class="pull-left">
              <router-link :to="'/by/user/detail/'+u.uuid">
                <img class="img-circle img-md"
                     :src="u.getAvatarUrl()+'?imageProcess=resize&imageResizeM=fill&imageResizeW=200&imageResizeH=200'">
              </router-link>
            </div>
            <div class="media-body">
              <div>
							<span class="f16">
								<router-link class="black" :to="'/by/user/detail/'+u.uuid">
											{{u.username}}
										<span v-if="u.uuid === user.uuid"
                          class="text-danger">(It's you)</span>
								</router-link>
							</span>
              </div>
              <div>
                <div class="mt5">
                  {{UserRoleMap[u.role].name}}
                </div>
                <div class="mt5">
                  <i class="fa fa-envelope" :class="{'text-success':u.emailValidate}" :title="u.emailValidate ? '已验证邮箱':'未认证邮箱'" v-if="u.email"></i>
                  {{u.email}}

                  <i class="fa fa-phone text-info" v-if="u.phone"></i>
                  {{u.phone}}
                </div>
              </div>
              <div class="mv5 text-muted one-line">
                {{u.description}}
              </div>
              <div>
                <span class="mr10">上次登录: {{u.lastTime | humanTime}}</span>
                <span class="mr10">上次IP: {{u.lastIp}}</span>

                <span class="pull-right action-buttons">
									<router-link :to="'/by/user/edit/'+u.uuid">
										<i class="fa fa-pencil text-info f18"></i>
									</router-link>
									<a href="javascript:void(0)" title="删除" @click.stop.prevent="u.confirmDel(refresh)">
                    <i class="fa fa-trash text-danger f18"></i>
									</a>
							</span>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-8 col-lg-offset-2 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>


    </div>





	</div>

</template>

<script>
  import NbFilter from '../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import Pager from '../../common/model/base/Pager'
  import User from '../../common/model/user/User'
  import {UserRole, UserRoleList, UserRoleMap} from "../../common/model/user/UserRole";
  import {UserGender, UserGenderList, UserGenderMap} from "../../common/model/user/UserGender";

  export default {

    data () {
      return {
        UserRole,
        UserRoleMap,
        UserRoleList,
        UserGender,
        UserGenderList,
        UserGenderMap,
        pager: new Pager(User),
        user: this.$store.state.user
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    methods: {
      search () {
        this.pager.page = 0
        this.refresh()
      },
      refresh () {
        this.pager.httpFastPage()
      }
    },
    mounted () {
      this.pager.enableHistory()
      this.refresh()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.backyard-user-list {

	}
</style>
