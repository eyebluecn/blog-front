<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!tag.editMode">新建标签</span>
						<span v-show="tag.editMode">编辑标签</span>
					</span>
        </div>
      </div>
      <div class="col-lg-8 col-lg-offset-2">
        <div class="bg-white br4 p20 mt10">

          <div class="row" v-validator="tag.validatorSchema.name.error">
            <label class="col-md-2 control-label mt5 compulsory">标签名称</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="tag.name">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5">标签logo</label>
            <div class="col-md-10">
              <NbTank :tank="tag.logoTank"/>
            </div>
          </div>
          <div class="row mt10">
            <div class="col-md-12">
              <div class="alert alert-info">
                提示：你可以从这里找到大量漂亮准确的图标：<a href="https://www.easyicon.net/" target="_blank">https://www.easyicon.net/</a>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div>
                <CreateSaveButton :entity="tag" :callback="save"/>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>

</template>

<script>
  import {Notification, MessageBox, DatePicker} from 'element-ui'
  import Tag from '../../common/model/tag/Tag'
  import NbTank from '../../common/widget/NbTank'
  import CreateSaveButton from '../widget/CreateSaveButton'

  export default {
    name: 'create',
    data() {
      return {
        user: this.$store.state.user,
        tag: new Tag()
      }
    },
    components: {
      NbTank,
      CreateSaveButton
    },
    methods: {
      save() {
        let that = this
        this.tag.errorMessage = null
        this.tag.httpSave(function (response) {
          Notification.success({
            message: that.tag.editMode ? '修改标签成功！' : '创建标签成功！'
          })

          that.$router.go(-1)
        })
      }
    },
    mounted() {
      let that = this
      this.tag.uuid = this.$store.state.route.params.uuid
      if (this.tag.uuid) {
        this.tag.editMode = true
        this.tag.httpDetail()
      }
    }
  }
</script>

<style>

</style>
