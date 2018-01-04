import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Article from '../article/Article'
import Comment from '../comment/Comment'

let Type = {
  REPORT_ARTICLE: 'REPORT_ARTICLE',
  REPORT_COMMENT: 'REPORT_COMMENT'
}

let TypeMap = {
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

export default class Report extends BaseEntity {
  constructor (args) {
    super(args)
    this.entityUuid = null
    this.entityName = null
    this.ip = null
    this.type = Type.REPORT_COMMENT
    this.content = null
    this.article = new Article()
    this.comment = new Comment()
  }

  render (obj) {
    super.render(obj)
    this.renderEntity('article', Article)
    this.renderEntity('comment', Comment)

  }

  getFilters () {
    return [
      new Filter(Filter.prototype.Type.SORT, '排序', 'orderSort'),
      new Filter(Filter.prototype.Type.INPUT, '主体ID', 'entityUuid'),
      new Filter(Filter.prototype.Type.INPUT, '主体名称', 'entityName'),
      new Filter(Filter.prototype.Type.SELECTION, '类型', 'type', this.getTypeList()),
      new Filter(Filter.prototype.Type.CHECK, '已处理', 'handled'),
      new Filter(Filter.prototype.Type.INPUT, '内容', 'content'),
      new Filter(Filter.prototype.Type.INPUT, 'IP', 'ip'),
      new Filter(Filter.prototype.Type.CHECK, '需要entity的详情', 'needEntityDetail', null, null, false)

    ]
  }

}
Report.registerEnum('Type', TypeMap)