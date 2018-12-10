import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Article from '../article/Article'
import Comment from '../comment/Comment'
import {ReportType, ReportTypeList} from "./ReportType";
import {FilterType} from "../base/FilterType";


export default class Report extends BaseEntity {
  constructor(args) {
    super(args)
    this.entityUuid = null
    this.entityName = null
    this.ip = null
    this.type = ReportType.REPORT_COMMENT
    this.content = null
    this.article = new Article()
    this.comment = new Comment()
  }

  render(obj) {
    super.render(obj)
    this.renderEntity('article', Article)
    this.renderEntity('comment', Comment)

  }

  getFilters() {
    return [
      ...super.getFilters(),
      new Filter(FilterType.INPUT, '主体ID', 'entityUuid'),
      new Filter(FilterType.INPUT, '主体名称', 'entityName'),
      new Filter(FilterType.SELECTION, '类型', 'type', ReportTypeList),
      new Filter(FilterType.INPUT, '内容', 'content'),
      new Filter(FilterType.INPUT, 'IP', 'ip'),
      new Filter(FilterType.CHECK, '需要entity的详情', 'needEntityDetail', null, null, false)

    ]
  }

}

