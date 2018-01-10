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
			<div class="col-md-12">
				<NbFilter :pager="pager" :callback="search">
					<router-link class="btn btn-primary btn-sm" to="/by/tag/create">
						<i class="fa fa-plus"></i>
						创建标签
					</router-link>
				</NbFilter>
			</div>

			<div class="col-md-6" v-for="(tag,index) in pager.data">

				<TagCell :tag="tag" size="detail-lg" :operate="true" :delCallback="refresh"/>

			</div>


			<div class="col-md-12 mt20">
				<NbPager :pager="pager" :callback="refresh"/>
			</div>

		</div>

	</div>
</template>

<script>
  import NbFilter from '../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import { MessageBox, Notification } from 'element-ui'
  import Pager from '../../common/model/base/Pager'
  import Tag from '../../common/model/tag/Tag'
  import TagCell from './widget/TagCell'

  export default {
    name: 'list',
    data () {
      return {
        pager: new Pager(Tag),
        user: this.$store.state.user
      }
    },
    components: {
      NbFilter,
      NbPager,
      TagCell
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
    created() {
      if (this.user.role === 'ADMIN') {
        this.pager.getFilter('userUuid').visible = true
      } else {
        this.pager.setFilterValue('userUuid', this.user.uuid)
      }
    },
    mounted () {
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
