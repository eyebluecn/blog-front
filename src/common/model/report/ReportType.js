let ReportType = {
  REPORT_ARTICLE: 'REPORT_ARTICLE',
  REPORT_COMMENT: 'REPORT_COMMENT'
}

let ReportTypeMap = {
  REPORT_ARTICLE: {
    name: '举报文章',
    value: 'REPORT_ARTICLE',
    style: 'danger'
  },
  REPORT_COMMENT: {
    name: '举报评论',
    value: 'REPORT_COMMENT',
    style: 'warning'
  }
}



let ReportTypeList = [];
for (let key in ReportTypeMap) {
  if (ReportTypeMap.hasOwnProperty(key)) {
    ReportTypeList.push(ReportTypeMap[key]);
  }
}

export {ReportType, ReportTypeMap, ReportTypeList}
