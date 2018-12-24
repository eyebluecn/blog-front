import {MessageBox} from 'element-ui'
import UserInputSelection from '../../../backyard/user/widget/UserInputSelection'
import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import Tag from '../tag/Tag'
import {FilterType} from "../base/FilterType";
import {ArticleType, ArticleTypeList} from "./ArticleType";
import {simpleDate} from "../../filter/time";

export default class Article extends BaseEntity {

  static URL_API_ARTICLE_TOP = '/api/article/top'
  static URL_API_ARTICLE_CANCEL_TOP = '/api/article/cancel/top'
  static URL_DOCUMENT_ASSIGN = '/api/article/document/assign'
  static URL_DOCUMENT_INDEX_DEL = '/api/article/document/index/del'
  static URL_DOCUMENT_ARTICLE_SAVE = '/api/article/document/article/save'
  static ROOT = "ROOT"

  constructor(args) {
    super(args)

    //发布者
    this.userUuid = null

    //标题
    this.title = null

    //路径
    this.path = null

    //标签
    this.tags = null

    //封面图片
    this.posterTankUuid = null

    //封面图片Url
    this.posterUrl = null

    //摘要
    this.digest = null

    //是否是markdown格式
    this.isMarkdown = true

    //markdown内容
    this.markdown = null

    //html内容
    this.html = null

    //是否是私有文章
    this.privacy = false

    //是否置顶
    this.top = false

    //点赞
    this.agree = 0

    //字数
    this.words = 0

    //点击数量
    this.hit = 1

    //评论数量
    this.commentNum = 0

    //是否接受评论的邮件通知
    this.needNotify = true

    //对应文档的uuid，只有类型是 DOCUMENT_ARTICLE时用到此字段
    this.documentUuid = null;

    //自己作为文档文章时，标题的父级是什么。第一级菜单的puuid是ROOT
    this.puuid = null;

    //类型，默认单篇文章类型
    this.type = ArticleType.ARTICLE

    //封面图片
    this.posterTank = new Tank('image', false, 10 * 1024 * 1024, '图片不能超过10M')

    //作者
    this.user = new User()

    //当前用户是否已经对这篇文章点赞了
    this.agreed = false

    //标签数组对象
    this.tagArray = []

    //作为文档的目录时，有子目录情况。
    this.children = []


    //本文文档
    this.document = null;

    //本地字段。
    //当前这篇文章是否处于设计阶段，在文档设计目录时有用到。
    this.designMode = false

    //创建文章时候的验证规则
    this.validatorSchema = {
      title: {
        rules: [{required: true, message: '标题必填'}],
        error: null
      },
      path: {
        rules: [{required: true, message: '路径必填'}],
        error: null
      }
    }


    //创建文档时候的验证规则
    this.documentValidatorSchema = {
      title: {
        rules: [{required: true, message: '标题必填'}],
        error: null
      },
      digest: {
        rules: [{required: true, message: '摘要必填'}],
        error: null
      },
      path: {
        rules: [{required: true, message: '路径必填'}],
        error: null
      }
    }

  }

  getFilters() {
    return [
      ...super.getFilters(),
      new Filter(FilterType.SORT, '置顶', 'orderTop'),
      new Filter(FilterType.SORT, '点击数', 'orderHit'),
      new Filter(FilterType.SORT, '是否共有', 'orderPrivacy'),
      new Filter(FilterType.HTTP_INPUT_SELECTION, '用户', 'userUuid', null, User, false, UserInputSelection),
      new Filter(FilterType.CHECK, '私有', 'privacy'),
      new Filter(FilterType.INPUT, '标题', 'title'),
      new Filter(FilterType.MULTI_SELECTION, '类型', 'types', ArticleTypeList, null, true),
      new Filter(FilterType.INPUT, '关键词', 'keyword'),
      new Filter(FilterType.INPUT, '附上标签', 'needTags', null, null, false)
    ]
  };

  render(obj) {
    super.render(obj)
    this.renderEntity('posterTank', Tank)
    this.renderEntity('user', User)
    this.renderList('tagArray', Tag)
    this.renderList('children', Article)
    this.renderEntity('document', Article)
  }

  getForm() {
    return {
      title: this.title,
      path: this.path,
      tags: this.tags,
      posterTankUuid: this.posterTankUuid,
      posterUrl: this.posterUrl,
      digest: this.digest,
      isMarkdown: this.isMarkdown,
      markdown: this.markdown,
      html: this.html,
      words: this.words,
      privacy: this.privacy,
      top: this.top,
      needNotify: this.needNotify,
      documentUuid: this.documentUuid,
      puuid: this.puuid,
      type: this.type,
      uuid: this.uuid ? this.uuid : null
    }
  }

  validate(validatorSchema = this.validatorSchema) {
    return super.validate(validatorSchema)
  }


  toggleDesignMode() {

    if (this.designMode) {
      if (this.validate()) {
        this.errorMessage = null;
        this.designMode = false;
      }
    } else {
      this.designMode = true;
    }

  }

  toggleEdit() {

    if (this.editMode) {
      this.finish();
    } else {
      this.editMode = true;
    }

  }

  finish() {

    if (this.validate()) {
      this.errorMessage = null;
      this.editMode = false;
    }

  }


  //添加一个子目录
  addChild() {

    let article = new Article()

    article.path = simpleDate(new Date())
    article.documentUuid = this.documentUuid
    article.puuid = this.uuid
    article.sort = (new Date()).getTime()
    article.document = this.document
    article.type = ArticleType.DOCUMENT_PLACEHOLDER_ARTICLE
    article.designMode = true

    this.children.push(article)
  }


  hasChildren() {
    return this.children && this.children.length
  }


  httpChangeTop(successCallback, errorCallback) {
    let that = this
    let confirmText = '将该文章置顶？'
    if (this.top) {
      confirmText = '取消该文章置顶？'
    }
    MessageBox.confirm(confirmText, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(function () {
        that.httpPost(that.top ? Article.URL_API_ARTICLE_CANCEL_TOP : Article.URL_API_ARTICLE_TOP, {articleUuid: that.uuid}, function (response) {
          typeof successCallback === 'function' && successCallback(response)
        })

      },
      function () {
      }
    )
  }

  httpSaveDocument(successCallback, errorCallback) {

    let that = this

    let url = this.getUrlCreate()
    if (this.uuid) {
      url = this.getUrlEdit()
    }

    this.errorMessage = this.validate(this.documentValidatorSchema)
    if (this.errorMessage) {
      that.defaultErrorHandler(this.errorMessage, errorCallback)
      return
    }

    this.httpPost(url, this.getForm(), function (response) {

      that.render(response.data.data)

      that.safeCallback(successCallback)(response)

    }, errorCallback)
  }


  httpDocumentAssign(documentUuid, puuid, articleUuid, sort, successCallback, errorCallback) {

    let that = this

    let form = {
      documentUuid,
      puuid,
      articleUuid,
      sort
    }

    this.httpPost(Article.URL_DOCUMENT_ASSIGN, form, function (response) {

      that.safeCallback(successCallback)(response)

    }, errorCallback)
  }

  //从文档中删除一个目录
  httpDocumentIndexDel(documentUuid, articleUuid, forceDelete, successCallback, errorCallback) {

    let that = this

    let form = {
      documentUuid,
      articleUuid,
      forceDelete
    }

    this.httpPost(Article.URL_DOCUMENT_INDEX_DEL, form, function (response) {

      that.safeCallback(successCallback)(response)

    }, errorCallback)
  }

  //保存一篇文档中的文章
  httpDocumentArticleSave(successCallback, errorCallback) {

    let that = this

    let form = {
      articleUuid: this.uuid,
      title: this.title,
      words: this.words,
      path: this.path,
      markdown: this.markdown,
      html: this.html
    }

    this.httpPost(Article.URL_DOCUMENT_ARTICLE_SAVE, form, function (response) {

      that.render(response.data.data)

      that.safeCallback(successCallback)(response)

    }, errorCallback)
  }


}
