<template>
	<div class="nb-pager-selection">

    <div class="title-area clearfix">
      <slot name="title"></slot>
      <button class="btn btn-default btn-sm ml15" @click="show=!show">
				<span v-if="show">
            <i class="fa fa-angle-up"></i>
				收起
          </span>
        <span v-else>
            <i class="fa fa-angle-down"></i>
				选择
        </span>

      </button>
    </div>
    <NbExpanding>
      <div v-show="show">
        <div class="content-area">
          <div class="row">

            <div class="col-xs-12">
              <NbFilter :filters="pager.filters" @change="search"></NbFilter>
            </div>

            <div class="col-xs-12">
              <slot name="cells"></slot>
            </div>


            <div class="col-xs-12 mt20">
              <NbPager :pager="pager" @change="refresh"></NbPager>
            </div>

          </div>
        </div>
      </div>

    </NbExpanding>


	</div>
</template>


<script>
  import Pager from "../../common/model/base/Pager";
  import NbFilter from './filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import NbExpanding from '../../common/widget/NbExpanding'

  export default {
		data () {
			return {
				show: false
			}
		},
		props: {
			pager: {
				type: Pager,
				required: true
			},
			activeItem: {
				type: Object,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			},
			callback: {
				type: Function,
				required: false
			}

		},
		components: {
			NbFilter,
			NbPager,
			NbExpanding
		},
		watch: {
			"activeItem.uuid"(newVal, oldVal){
				newVal = parseInt(newVal);
				oldVal = parseInt(oldVal);

				if (newVal !== oldVal) {
					this.show = false
				}
			}
		},
		computed: {},
		methods: {

			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				this.pager.httpFastPage();
			}
		},
		mounted(){
			if (this.initFilter) {
				for (let key in this.initFilter) {
					this.pager.setFilterValue(key, this.initFilter[key]);
				}
			}

			this.refresh();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">

	.nb-pager-selection {

		.title-area {

		}
		.content-area {
			margin-top: 10px;
			padding: 10px;
			border: 1px dashed #1167a9;
		}

	}

</style>
