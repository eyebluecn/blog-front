<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
          <span class="item active">标签列表</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 col-lg-offset-2">
        <NbFilter :pager="pager" :callback="search">
          <router-link class="btn btn-primary btn-sm" to="/by/tag/create">
            <i class="fa fa-plus"></i>
            创建标签
          </router-link>
        </NbFilter>
      </div>
      <div class="col-lg-8 col-lg-offset-2">
        <div class="row">
          <div class="col-md-6" v-for="(tag,index) in pager.data">

            <TagCell :tag="tag" size="detail-lg" :operate="true" :delCallback="refresh"/>

          </div>
        </div>
      </div>


      <div class="col-lg-8 col-lg-offset-2 mt20">
        <NbPager :pager="pager" :callback="refresh"/>
      </div>


      <div class="col-lg-8 col-lg-offset-2 mt20">
        <h2>NbTank</h2>

        <div>
          <NbTank :preview="true" :tank="tank"/>
        </div>

        <h2>NbTanks</h2>
        <div>
          <NbTanks :tanks="tanks" :maxNum="3"/>
        </div>


      </div>

    </div>

  </div>
</template>

<script>
  import NbFilter from '../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import Pager from '../../common/model/base/Pager'
  import Tag from '../../common/model/tag/Tag'
  import TagCell from './widget/TagCell'
  import NbTank from '../../common/widget/NbTank'
  import NbTanks from '../../common/widget/NbTanks'
  import Tank from "../../common/model/tank/Tank";

  export default {
    data() {
      return {
        pager: new Pager(Tag),
        user: this.$store.state.user,
        tank: new Tank("*", false, 1024 * 1024, "单个文件的测试上传"),
        tanks: []
      }
    },
    components: {
      NbFilter,
      NbPager,
      TagCell,
      NbTank,
      NbTanks
    },
    methods: {
      search() {
        this.pager.page = 0
        this.refresh()
      },
      refresh() {
        this.pager.httpFastPage()
      }
    },
    created() {
      if (this.user.role === 'ADMIN') {
        this.pager.getFilter('userUuid').visible = true
      } else {
        this.pager.setFilterValue('userUuid', this.user.uuid)
      }
    },
    mounted() {
      this.pager.enableHistory()
      if (!this.pager.getFilterValue('userUuid')) {
        this.pager.setFilterValue('userUuid', this.user.uuid)
      }

      this.refresh()
    }
  }
</script>

<style>

</style>
