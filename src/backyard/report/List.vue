<template>
	<div class="backyard-report-list">
		<div class="row">
			<div class="col-md-12">
				<div class="pedia-navigation">
					<span class="item active">举报列表</span>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-10 col-md-offset-1">
				<NbFilter :pager="pager" :callback="search"/>
			</div>

			<div class="col-md-10 col-md-offset-1" v-for="report in pager.data">
				<ReportCell :report="report" :delCallback="refresh"/>
			</div>

			<div class="col-md-10 col-md-offset-1 mt20">
				<NbPager :pager="pager" :callback="refresh"/>
			</div>

		</div>

	</div>
</template>

<script>
  import NbFilter from '../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import ReportCell from './widget/ReportCell'
  import { MessageBox, Notification } from 'element-ui'
  import Pager from '../../common/model/base/Pager'
  import Report from '../../common/model/report/Report'

  export default {
    name: 'list',
    data () {
      return {
        pager: new Pager(Report),
	      user: this.$store.state.user
      }
    },
	  components:{
      NbFilter,
      NbPager,
      ReportCell
	  },
	  methods:{
      search () {
        this.pager.page = 0
        this.refresh()
      },
      refresh () {
        this.pager.httpFastPage()
      }
	  },
	  mounted(){
      this.pager.enableHistory()
		  this.refresh()
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.backyard-report-list {

	}
</style>