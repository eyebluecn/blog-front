import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Pager from '../base/Pager'

export default class Comment extends BaseEntity {
  constructor (args) {
    super(args)
    this.articleUuid = null
    this.userUuid = null
    this.isFloor = false
    this.floorUuid = null
    this.puuid = null
    this.name = null
    this.email = null
    this.content = null
    this.isReport = false
    this.report = null
    this.agree = 0
    this.ip = null
    this.agreed = false
    this.commentPager = new Pager(Comment, 10)
    this.validatorSchema = {
      articleUuid: {
        rules: [{required: true, message: '文章ID必填'}],
        error: null
      },
      isFloor: {
        rules: [{required: true, message: '是否是楼层评论必填'}],
        error: null
      },
      name: {
        rules: [{required: true, message: '评论者姓名必填'}],
        error: null
      },
      content: {
        rules: [{required: true, message: '评论内容必填'}],
        error: null
      }
    }
  }

  static URL_API_COMMENT_CREATE = '/comment/create'
  static URL_API_COMMENT_AGREE = '/comment/agree'
  static URL_API_COMMENT_CANCEL_AGREE = '/comment/cancel/agree'

  render (obj) {
    super.render(obj)
    this.renderEntity('commentPager', Pager)
  }

  getFilters () {
    return [
      new Filter(Filter.prototype.Type.SORT, '排序', 'orderSort'),
      new Filter(Filter.prototype.Type.INPUT, '用户uuid', 'userUuid'),
      new Filter(Filter.prototype.Type.INPUT, '文章uuid', 'articleUuid'),
      new Filter(Filter.prototype.Type.CHECK, '是否是楼层评论', 'isFloor'),
      new Filter(Filter.prototype.Type.INPUT, '附属楼层uuid', 'floorUuid'),
      new Filter(Filter.prototype.Type.INPUT, '回复的uuid', 'puuid'),
      new Filter(Filter.prototype.Type.INPUT, '评论者姓名', 'name'),
      new Filter(Filter.prototype.Type.INPUT, '评论者邮箱', 'email'),
      new Filter(Filter.prototype.Type.INPUT, '评论内容', 'content'),
      new Filter(Filter.prototype.Type.CHECK, '是否被举报', 'isReport'),
      new Filter(Filter.prototype.Type.INPUT, '举报内容', 'report'),
      new Filter(Filter.prototype.Type.CHECK, '是否需要子评论', 'needSubPager')
    ]
  }

  validate () {
    return super.validate()
  }

  getForm () {
    return {
      articleUuid: this.articleUuid,
      isFloor: this.isFloor,
      floorUuid: this.floorUuid,
      puuid: this.puuid,
      name: this.name,
      email: this.email,
      content: this.content
    }
  }

  refreshCommentPager () {
    let that = this
    return function () {
      that.commentPager.setFilterValue('orderSort', 'DESC')
      that.commentPager.setFilterValue('articleUuid', this.articleUuid)
      that.commentPager.setFilterValue('floorUuid', this.uuid)
      that.commentPager.setFilterValue('isFloor', false)
      that.commentPager.setFilterValue('needSubPager', false)
      that.commentPager.httpFastPage()
    }

  }

  httpCreate (successCallback, errorCallback) {
    let that = this
    this.httpPost(Comment.URL_API_COMMENT_CREATE, this.getForm(), function (response) {
      typeof successCallback === 'function' && successCallback(response)
    }, errorCallback)
  }

  httpAgreeChange(successCallback, errorCallback){
    let that = this
    if(this.agreed){
      this.httpPost(Comment.URL_API_COMMENT_CANCEL_AGREE,{'commentUuid':this.uuid},function (response) {
        that.agree --
        that.agreed = false
      },errorCallback)
    }else{
      this.httpPost(Comment.URL_API_COMMENT_AGREE,{'commentUuid':this.uuid},function (response) {
        that.agree ++
        that.agreed = true
      },errorCallback)
    }
  }

}