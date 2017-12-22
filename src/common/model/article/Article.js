import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import { simpleDateTime } from '../../filter/time'
import { Notification } from 'element-ui'
import Tank from '../tank/Tank'
import User from '../user/User'
import Tag from '../tag/Tag'

export default class Article extends BaseEntity {

  constructor (args) {
    super(args)

    //发布者
    this.userUuid = null

    //标题
    this.title = null

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

    //编辑和修改文章时的验证规则。也是默认的验证规则。
    this.validatorSchema = {
      title: {
        rules: [{required: true, message: '标题必填'}, {max: 255, message: '标题最长255字'}],
        error: null
      },
      html: {
        rules: [{required: true, message: '内容必填'}, {max: 10000, message: '内容最长10000字'}],
        error: null
      },
      words: {
        rules: [{required: true, message: '文章字数必填'}],
        error: null
      }
    }

  }

  getFilters () {
    return [
      new Filter('SORT', '排序', 'orderSort'),
      new Filter('SORT', '置顶', 'orderTop'),
      new Filter('SORT', '点击数', 'orderHit'),
      new Filter('SORT', '是否共有', 'orderPrivacy'),
      new Filter('SORT', '发布日期', 'orderReleaseTime'),
      new Filter('INPUT', '用户', 'userUuid'),
      new Filter('INPUT', '标题', 'title'),
      new Filter('INPUT', '标签', 'tag'),
      new Filter('INPUT', '关键词', 'keyword')
    ]
  };

  render (obj) {
    super.render(obj)
    this.renderEntity('posterTank', Tank)
    this.renderEntity('user',User)
    this.renderList('tagArray',Tag)
  }

  getForm () {
    return {
      title: this.title,
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

  validate () {
    if (this.posterTank) {
      this.posterTankUuid = this.posterTank.uuid
      this.posterUrl = this.posterTank.url
    }

    if (!this.html || this.html.length > 10000) {
      Notification.error({
        message: '文章内容必填且不超过10000字'
      })
    }

    return super.validate()
  }

}
