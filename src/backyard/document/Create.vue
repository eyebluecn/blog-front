<template>
  <div class="animated fadeIn backyard-user-edit">

    <div class="row">

      <div class="col-lg-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!currentUser.editMode">创建文档</span>
						<span v-show="currentUser.editMode">编辑文档</span>
					</span>
        </div>
      </div>

      <div class="col-xs-12">
        <div class="bg-white br4 border p10">

          <div class="row" v-if="user.hasPermission(FeatureType.USER_MANAGE)"
               v-validator="currentUser.validatorSchema.role.error">
            <label class="col-md-2 control-label mt5 compulsory">角色</label>
            <div class="col-md-10 validate">
              <select class="form-control" v-model="currentUser.role">
                <option v-for="(item,index) in UserRoleList" v-if="item.value !== 'GUEST'"
                        :value="item.value">{{item.name}}
                </option>
              </select>
            </div>
          </div>

          <div class="row mt10"
               v-if="user.hasPermission(FeatureType.USER_MANAGE) && !currentUser.emailValidate"
               v-validator="currentUser.validatorSchema.email.error">
            <label class="col-md-2 control-label mt5 compulsory">邮箱</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="currentUser.email">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5">城市</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="currentUser.city">
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-12">
              <CreateSaveButton :entity="currentUser" :callback="save"></CreateSaveButton>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {Notification} from 'element-ui'
  import {FeatureType} from '../../common/model/core/FeatureType'
  import NbRadio from '../../common/widget/NbRadio.vue'
  import NbTank from '../../common/widget/NbTank.vue'
  import CreateSaveButton from '../widget/CreateSaveButton'
  import User from '../../common/model/user/User'
  import {UserRole, UserRoleList, UserRoleMap} from "../../common/model/user/UserRole";
  import {UserGender, UserGenderList, UserGenderMap} from "../../common/model/user/UserGender";

  export default {

    data() {
      return {
        UserRole,
        UserRoleMap,
        UserRoleList,
        UserGender,
        UserGenderList,
        UserGenderMap,
        FeatureType,
        repassword: null,
        user: this.$store.state.user,
        breadcrumbs: this.$store.state.breadcrumbs,
        currentUser: new User()
      }
    },
    components: {
      NbRadio,
      NbTank,
      CreateSaveButton
    },
    methods: {
      save() {
        let that = this
        if (!this.currentUser.editMode && this.currentUser.password !== this.repassword) {
          Notification.error('两次密码输入不一致')
          return
        }

        this.currentUser.httpSave(function (response) {
          Notification.success({
            message: that.currentUser.editMode ? '修改用户成功！' : '创建用户成功！'
          })
          that.$router.go(-1)
        })
      }
    },
    created() {
      if (!this.user.hasPermission(FeatureType.USER_MANAGE)) {
        this.breadcrumbs.splice(0, this.breadcrumbs.length)
        this.breadcrumbs.push({
          name: 'UserDetail',
          title: '用户详情'
        }, {
          name: 'UserEdit',
          title: '编辑资料'
        })
      }
    },
    mounted() {
      let that = this
      this.currentUser.errorMessage = null
      this.currentUser.uuid = this.$store.state.route.params.uuid
      if (this.currentUser.uuid) {
        this.currentUser.httpDetail()
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .backyard-user-edit {

  }
</style>
