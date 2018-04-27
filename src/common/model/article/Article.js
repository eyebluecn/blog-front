import {MessageBox} from 'element-ui'
import UserInputSelection from '../../../backyard/user/widget/UserInputSelection'
import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import Tag from '../tag/Tag'

export default class Article extends BaseEntity {

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

    //封面图片
    this.posterTank = new Tank('image', false, 1024 * 1024, '图片不能超过1M')

    //作者
    this.user = new User()

    //当前用户是否已经对这篇文章点赞了
    this.agreed = false

    //标签数组对象
    this.tagArray = []


  }


  static URL_API_ARTICLE_TOP = '/article/top'
  static URL_API_ARTICLE_CANCEL_TOP = '/article/cancel/top'

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, '排序', 'orderSort'),
      new Filter(Filter.prototype.Type.SORT, '置顶', 'orderTop'),
      new Filter(Filter.prototype.Type.SORT, '点击数', 'orderHit'),
      new Filter(Filter.prototype.Type.SORT, '是否共有', 'orderPrivacy'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.HTTP_INPUT_SELECTION, '用户', 'userUuid', null, User, false, UserInputSelection),
      new Filter(Filter.prototype.Type.CHECK, '私有', 'privacy'),
      new Filter(Filter.prototype.Type.INPUT, '标题', 'title'),
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword')
    ]
  };

  render(obj) {
    super.render(obj)
    this.renderEntity('posterTank', Tank)
    this.renderEntity('user', User)
    this.renderList('tagArray', Tag)
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
      uuid: this.uuid ? this.uuid : null
    }
  }

  validate() {
    if (this.posterTank) {
      this.posterTankUuid = this.posterTank.uuid
      this.posterUrl = this.posterTank.url
    }

    if (!this.title) {
      this.errorMessage = "标题必填";
      return false
    }

    if (this.isMarkdown) {
      if (!this.markdown || this.markdown.length > 2147483647) {
        this.errorMessage = "文章内容必填且不超过2147483647字";
        return false
      }
    }

    if (!this.html || this.html.length > 2147483647) {

      this.errorMessage = "文章内容必填且不超过2147483647字";
      return false
    }



    this.errorMessage = null;
    return true
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

}
