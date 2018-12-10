import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Pager from '../base/Pager'
import {FilterType} from "../base/FilterType";

export default class Comment extends BaseEntity {


  static URL_API_COMMENT_CREATE = '/api/comment/create'
  static URL_API_COMMENT_AGREE = '/api/comment/agree'
  static URL_API_COMMENT_CANCEL_AGREE = '/api/comment/cancel/agree'


  constructor (args) {
    super(args)
    this.articleUuid = null
    this.userUuid = null
    this.isFloor = false
    this.floorUuid = null
    this.puuid = null
    this.name = null
    //评论者头像：TODO：show in the view.
    this.avatarUrl = null
    this.email = null
    this.content = null
    this.agree = 0
    this.ip = null
    this.agreed = false
    this.commentPager = new Pager(Comment, 10)
    this.articleTitle = null
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

  render (obj) {
    super.render(obj)
    this.renderEntity('commentPager', Pager)
  }

  getFilters () {
    return [
      ...super.getFilters(),
      new Filter(FilterType.INPUT, 'uuid', 'uuid', null, null, false),
      new Filter(FilterType.INPUT, '用户uuid', 'userUuid'),
      new Filter(FilterType.INPUT, '文章uuid', 'articleUuid'),
      new Filter(FilterType.CHECK, '是否是楼层评论', 'isFloor'),
      new Filter(FilterType.INPUT, '附属楼层uuid', 'floorUuid'),
      new Filter(FilterType.INPUT, '回复的uuid', 'puuid'),
      new Filter(FilterType.INPUT, '评论者姓名', 'name'),
      new Filter(FilterType.INPUT, '评论者邮箱', 'email'),
      new Filter(FilterType.INPUT, '评论内容', 'content'),
      new Filter(FilterType.CHECK, '是否需要子评论', 'needSubPager')
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

  httpAgreeChange (successCallback, errorCallback) {
    let that = this
    if (this.agreed) {
      this.httpPost(Comment.URL_API_COMMENT_CANCEL_AGREE, {'commentUuid': this.uuid}, function (response) {
        that.agree = that.agree - 1
        that.agreed = false
      }, errorCallback)
    } else {
      this.httpPost(Comment.URL_API_COMMENT_AGREE, {'commentUuid': this.uuid}, function (response) {
        that.agree = that.agree + 1
        that.agreed = true
      }, errorCallback)
    }
  }

}
