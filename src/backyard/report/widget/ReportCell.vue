<template>
  <div class="report-cell">
    <div class="media">
      <div class="media-body">
        <div class="title">
          <router-link v-if="report.article" :to="'/by/article/detail/' + report.article.uuid">
            {{report.article.title}}
          </router-link>
          <router-link v-if="report.comment" :to="'/by/article/detail/' + report.comment.articleUuid">
            {{report.comment.articleTitle}}
          </router-link>
        </div>
        <div v-if="report.type === ReportType.REPORT_COMMENT" class="report-comment">
          <router-link :to="'/by/article/detail/' + report.comment.articleUuid + '?commentUuid=' + report.comment.uuid">
            {{report.comment.name + ' ：' + report.comment.content}}
          </router-link>
        </div>

        <div class="mt10">
					<span>
						{{report.ip + ' ' + ReportTypeMap[report.type].name + ' ' + report.content}}
					</span>
          <span class="pull-right action-buttons">
						<a href="javascript:void(0)" title="删除举报" @click.stop.prevent="report.confirmDel(delCallback)"
               style="outline: none;">
							<i class="fa fa-trash text-danger f18"></i>
						</a>
					</span>
        </div>


      </div>
    </div>


  </div>
</template>

<script>
  import Report from '../../../common/model/report/Report'
  import {ReportType, ReportTypeList, ReportTypeMap} from "../../../common/model/report/ReportType";

  export default {
    data() {
      return {
        ReportType,
        ReportTypeMap,
        ReportTypeList,
        Report
      }
    },
    props: {
      report: {
        type: Report,
        required: true
      },
      delCallback: {
        type: Function,
        required: false,
        default: function () {
          return true
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .report-cell {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding: 20px;
    position: relative;
    .title {
      margin-bottom: 10px;
      a {
        font-size: 18px;
        font-weight: bold;
        color: #555;
        &:hover {
          color: #000;
          text-decoration: underline;
        }
      }
    }
    .report-comment {
      background-color: rgba(181, 181, 181, 0.1);
      padding: 10px;
      border-radius: 5px;
      a {
        color: #555;
        &:hover {
          color: #000;
          text-decoration: underline;
        }
      }
    }
  }
</style>
