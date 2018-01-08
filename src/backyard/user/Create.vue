<template>
  <div class="animated fadeIn backyard-user-edit">

    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!currentUser.editMode">创建用户</span>
						<span v-show="currentUser.editMode">编辑用户</span>
					</span>
        </div>
      </div>

      <div class="col-md-12">
        <div class="bg-white br4 border p10">

          <div class="row">
            <label class="col-md-2 control-label mt5">头像</label>
            <div class="col-md-10">
              <NbTank :tank="currentUser.avatar"/>
            </div>
          </div>

          <div class="row mt10" v-validator="currentUser.validatorSchema.username.error">
            <label class="col-md-2 control-label mt5 compulsory">用户名</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="currentUser.username">
            </div>
          </div>

          <div class="row mt10" v-if="user.hasPermission(FeatureType.USER_MANAGE)"
               v-validator="currentUser.validatorSchema.role.error">
            <label class="col-md-2 control-label mt5 compulsory">角色</label>
            <div class="col-md-10 validate">
              <select class="form-control" v-model="currentUser.role">
                <option v-for="(item,index) in currentUser.getRoleList()" v-if="item.value !== 'GUEST'"
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

          <div class="row mt10" v-if="!currentUser.editMode" v-validator="currentUser.validatorSchema.password.error">
            <label class="col-md-2 control-label mt5 compulsory">密码</label>
            <div class="col-md-10 validate">
              <input type="password" class="form-control" v-model="currentUser.password">
            </div>
          </div>

          <div class="row mt10" v-if="!currentUser.editMode">
            <label class="col-md-2 control-label mt5 compulsory">确认密码</label>
            <div class="col-md-10">
              <input type="password" class="form-control" v-model="repassword">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5">手机</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="currentUser.phone">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5">性别</label>
            <div class="col-md-10">
            <span v-for="gender in currentUser.getGenderList()" class="mr10">
              <NbRadio v-model="currentUser.gender" :val="gender.value" name="gender"></NbRadio>
              <label>{{gender.name}}</label>
            </span>
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5">城市</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="currentUser.city">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5">个人简介</label>
            <div class="col-md-10">
						<textarea class="form-control" rows="6" v-model="currentUser.description" style="resize: none"
                      placeholder="此处填写个人简介……"></textarea>
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
  import { Notification } from 'element-ui'
  import { FeatureType } from '../../common/model/feature/FeatureType'
  import NbRadio from '../../common/widget/NbRadio.vue'
  import NbTank from '../../common/widget/NbTank.vue'
  import CreateSaveButton from '../widget/CreateSaveButton'
  import User from '../../common/model/user/User'

  export default {
    name: 'create',
    data () {
      return {
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
      save () {
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
    created () {
      if (!this.user.hasPermission(FeatureType.USER_MANAGE)) {
        this.breadcrumbs.splice(0, this.breadcrumbs.length)
        this.breadcrumbs.push({
          name: 'UserDetail',
          title: '用户详情'
        },{
          name: 'UserEdit',
          title: '编辑资料'
        })
      }
    },
    mounted () {
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
