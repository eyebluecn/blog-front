import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Tank from '../tank/Tank'

export default class Preference extends BaseEntity {
  constructor (args) {
    super(args)
    //网站名称
    this.name = null

    //logo
    this.logoUrl = null
    this.logoTankUuid = null
    this.faviconUrl = null
    this.faviconTankUuid = null

    //五个菜单
    this.menuName1 = null
    this.menuUrl1 = null
    this.menuName2 = null
    this.menuUrl2 = null
    this.menuName3 = null
    this.menuUrl3 = null
    this.menuName4 = null
    this.menuUrl4 = null
    this.menuName5 = null
    this.menuUrl5 = null

    //底部第一行文字
    this.footerLine1 = null
    this.footerLine2 = null
    this.version = null

    this.logoTank = new Tank('image', false, 1024 * 1024, '图片不能超过1M')
    this.faviconTank = new Tank('.ico', false, 1024 * 1024, '图片不能超过1M')

    this.validatorSchema = {
      name: {
        rules: [{required: true, message: '网站名称必填'}],
        error: null
      }
    }
  }

  static URL_API_PREFERENCE_FETCH = '/preference/fetch'

  render (obj) {
    super.render(obj)
    this.renderEntity('logoTank', Tank)
    this.renderEntity('faviconTank', Tank)
  }

  getForm () {
    return {
      name: this.name,
      logoUrl: this.logoUrl,
      logoTankUuid: this.logoTankUuid,
      faviconUrl: this.faviconUrl,
      faviconTankUuid: this.faviconTankUuid,
      menuName1: this.menuName1,
      menuUrl1: this.menuUrl1,
      menuName2: this.menuName2,
      menuUrl2: this.menuUrl2,
      menuName3: this.menuName3,
      menuUrl3: this.menuUrl3,
      menuName4: this.menuName4,
      menuUrl4: this.menuUrl4,
      menuName5: this.menuName5,
      menuUrl5: this.menuUrl5,
      footerLine1: this.footerLine1,
      footerLine2: this.footerLine2
    }
  }

  validate(){
    if (this.logoTank) {
      this.logoTankUuid = this.logoTank.uuid
      this.logoUrl = this.logoTank.url
    }
    if (this.faviconTank) {
      this.faviconTankUuid = this.faviconTank.uuid
      this.faviconUrl = this.faviconTank.url
    }
    return super.validate()
  }

  httpFetch (successCallback, errorCallback) {
    let that = this
    this.httpPost(Preference.URL_API_PREFERENCE_FETCH,{},function (response) {
      that.render(response.data.data)
      typeof successCallback === 'function' && successCallback(response)
    },errorCallback)
  }

  //修改title和favicon
  updateTitleAndFavicon() {

    if (this.faviconUrl) {
      //修改favicon
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = this.faviconUrl;
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    document.title = this.name

  }

}