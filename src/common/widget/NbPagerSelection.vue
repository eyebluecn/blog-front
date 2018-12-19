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
              <NbPlainFilter :filters="innerFilters" @change="search"></NbPlainFilter>
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
  import NbPlainFilter from './filter/NbPlainFilter'
  import NbPager from '../../common/widget/NbPager.vue'
  import NbExpanding from '../../common/widget/NbExpanding'
  import {SortDirection} from "../model/base/SortDirection";

  export default {
    data() {
      return {
        show: false
      }
    },
    computed: {

      innerFilters() {
        if (this.filters === null || this.filters === undefined) {
          return this.pager.filters;
        } else {
          return this.filters;
        }
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
      //允许用户自定义筛选项
      filters: {
        type: Array | undefined | null,
        required: false
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
      NbPlainFilter,
      NbPager,
      NbExpanding
    },
    watch: {
      "activeItem.uuid"(newVal, oldVal) {

        if (newVal !== oldVal) {
          this.show = false
        }
      }
    },
    methods: {

      search() {
        this.pager.page = 0;
        this.refresh()
      },
      refresh() {
        this.pager.httpFastPage();
      }
    },
    mounted() {

      let hasInitFilter = false;
      if (this.initFilter) {
        for (let key in this.initFilter) {
          this.pager.setFilterValue(key, this.initFilter[key]);
          hasInitFilter = true;
        }
      }

      //没有筛选过滤器，默认使用更新时间的倒叙排列
      if (!hasInitFilter) {
        console.log("长度为0")
        this.pager.setFilterValue("orderUpdateTime", SortDirection.DESC);
      } else {
        console.log("长度为非0", this.pager.filters)
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
