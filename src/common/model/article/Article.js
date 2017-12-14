import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import { simpleDateTime } from '../../filter/time'

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

    //作者
    this.author = null

    //摘要
    this.digest = null

    //是否是markdown格式
    this.isMarkdown = null

    //markdown内容
    this.markdown = null

    //html内容
    this.html = null

    //是否是私有文章
    this.privacy = null

    //是否置顶
    this.top = false

    //点击数量
    this.hit = 1

    //发布日期
    this.releaseTime = new Date()

    //编辑和修改文章时的验证规则。也是默认的验证规则。
    this.validatorSchema = {
      title: {
        rules: [{required: true, message: '名称必填并且最长255字'}],
        error: null
      },
      tags: {
        rules: [{required: true, message: '标签必填并且最长1024字'}],
        error: null
      },
      content: {
        rules: [{required: true, message: '内容必填并且最长100000字'}],
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
    this.renderEntity('releaseTime', Date)
  }

  getForm () {
    return {
      title: this.title,
      tags: this.tags,
      posterTankUuid: this.posterTankUuid,
      posterUrl: this.posterUrl,
      author: this.author,
      digest: this.digest,
      isMarkdown: this.isMarkdown,
      content: this.content,
      privacy: this.privacy,
      top: this.top,
      releaseTime: simpleDateTime(this.releaseTime),
      uuid: this.uuid ? this.uuid : null
    }
  }

  validate () {
    return super.validate()
  }

}
