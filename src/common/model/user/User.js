import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import $ from 'jquery'
import { readLocalStorage, removeLocalStorage, saveToLocalStorage } from '../../util/Utils'
import { simpleDateTime } from '../../filter/time'
import Menu from "../../frontend/Menu"
import MenuManager from "../../frontend/MenuManager"

let Gender = {
  UNKNOWN: 'UNKNOWN',
  MALE: 'MALE',
  FEMALE: 'FEMALE'
}
let GenderMap = {
  UNKNOWN: {
    name: '保密',
    value: 'UNKNOWN',
    style: 'success'
  },
  MALE: {
    name: '男',
    value: 'MALE',
    style: 'info'
  },
  FEMALE: {
    name: '女',
    value: 'FEMALE',
    style: 'primary'
  }
}

let Role = {
  USER: 'USER',
  ADMIN: 'ADMIN'
}
let RoleMap = {
  USER: {
    name: '注册用户',
    value: 'USER',
    style: 'success'
  },
  ADMIN: {
    name: '管理员',
    value: 'ADMIN',
    style: 'info'
  }
}

export default class User extends BaseEntity {
  constructor (args) {
    super(args)

    this.username = null;
    this.password = null;
    this.role = Role.ADMIN = null;
    this.email = null;
    this.phone = null;
    //用户角色
    this.gender = Gender.UNKNOWN;
    this.city = null;
    this.description = null;
    this.avatarTankUuid = null;
    this.avatarUrl = null;
    //上次登录IP
    this.lastIp = null;
    //上次登录时间
    this.lastTime = null;
    //local fields.
    //统指邮箱或手机
    this.isLogin = false
    this.byMenus = []

    //登录的密码，服务器返回字段中没有密码
    this.localPassword = null
    this.createTime = null


    this.validatorSchema = {
      phone: {
        rules: [{required: true, message: '手机号必填'}],
        error: null
      },
      password: {
        rules: [{required: true, message: '密码必填'}],
        error: null
      },
      realname: {
        rules: [{required: true, message: '用户名必填'}],
        error: null
      }
    }
  }

  static URL_LOGIN = '/admin/member/login'
  static URL_LOGOUT = '/admin/member/logout'
  static URL_MEMBER_RESET_PASSWORD = '/admin/member/reset/password'

  getFilters () {
    return [
      new Filter(Filter.prototype.Type.SORT, '序号', 'orderSort'),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, '角色', 'roleUuid', null, UserRole),
      new Filter(Filter.prototype.Type.INPUT, '姓名', 'realname'),
      new Filter(Filter.prototype.Type.INPUT, '邮箱', 'email'),
      new Filter(Filter.prototype.Type.INPUT, '电话', 'phone'),
      new Filter(Filter.prototype.Type.INPUT, '关键字', 'keyword'),
      new Filter(Filter.prototype.Type.INPUT, '简单选择', 'simpleSelection', null, null, false, null),
      new Filter(Filter.prototype.Type.INPUT, '角色详情', 'needRoleDetail', null, null, false, null)
    ]
  };

  //We use this method to get the full js Object.
  render (obj) {
    super.render(obj)
    this.renderEntity('lastTime', Date)
  }

  //获取用户头像的url.
  getAvatarUrl () {
    if (this.avatarUrl) {
      return this.avatarUrl
    } else {
      return require('../../../assets/img/avatar.png')
    }
  }

  refreshMenus () {

    //后台菜单。不同用户看到的东西不一样。
    this.byMenus = MenuManager.refreshByMenus(this)

  };

  //将用户信息存储在本地。
  renderFromLocalStorage () {

    try {
      let memberString = readLocalStorage(this.getTAG())

      if (memberString) {
        let json = JSON.parse(memberString)
        this.render(json)
        //从本地加载member之后，可以去访问后台菜单了
        this.refreshMenus()
      }

    } catch (e) {
      removeLocalStorage(this.getTAG())
    }
  }

  //将用户信息存储在本地。
  saveToLocalStorage (rawUserObject = null) {

    if (rawUserObject) {
      rawUserObject.isLogin = true
    }
    saveToLocalStorage(this.getTAG(), JSON.stringify(rawUserObject))
  }

  //清除本地的member信息
  clearLocalStorage () {

    removeLocalStorage(this.getTAG())
  }

  //更新本地持久化了的个别字段。
  updateLocalStorage (opt = {}) {
    try {
      let memberString = readLocalStorage(this.getTAG())

      if (memberString) {
        let json = JSON.parse(memberString)
        $.extend(json, opt)

        saveToLocalStorage(this.getTAG(), JSON.stringify(json))
      }

    } catch (e) {
      removeLocalStorage(this.getTAG())
    }
  }

  getForm () {

    return {
      roleUuid: this.role.uuid,
      email: this.email,
      phone: this.phone,
      password: this.password,
      realname: this.realname,
      description: this.description,
      gender: this.gender,
      city: this.city,
      avatarUrl: this.avatarUrl,
      uuid: this.uuid ? this.uuid : null
    }
  }

  validate () {

    if (this.editMode) {
      this.password = true
    }

    return super.validate()
  }

  httpSave (captcha, successCallback, errorCallback) {
    let that = this
    let url = this.getUrlCreate()
    if (this.uuid) {
      url = this.getUrlEdit()
    }

    if (!this.validate()) {
      that.defaultErrorHandler(this.errorMessage, errorCallback)
      return
    }

    if (!captcha && !this.editMode) {
      this.errorMessage = '请先获取短信验证码后进行操作'
      return
    }

    let form = this.getForm()
    form.captcha = captcha

    this.httpPost(url, form, function (response) {

      that.render(response.data.data)

      successCallback && successCallback(response)

    }, errorCallback)
  }

  //local logout.
  innerLogout () {

    this.render(new User())

    //菜单刷新一次。
    this.refreshMenus()

    this.clearLocalStorage()

  }

  innerLogin (response) {
    let that = this
    that.errorMessage = null
    that.render(response.data.data)
    that.isLogin = true

    //用户登陆后我们认为可以去访问后台菜单了
    this.refreshMenus()

    //登录成功后去本地保存一下用户的简单信息，方便下次自动填入个别字段。
    this.saveToLocalStorage(response.data.data)

  }

  loginValidate () {

    if (!this.phone) {
      this.errorMessage = '手机必填'
      return false
    }

    if (!this.localPassword) {
      this.errorMessage = '密码必填'
      return false
    }

    return true
  }

  resetValidate () {

    if (!this.phone) {
      this.errorMessage = '手机必填'
      return false
    }
    if (!this.password) {
      this.errorMessage = '密码必填'
      return false
    }

    return true
  }

  getLoginForm () {

    return {
      phone: this.phone,
      password: this.localPassword
    }
  }

  hasPermission (featureType) {

    if (this.role) {
      return this.role.hasPermission(featureType)
    } else {
      console.error('该用户没有角色，请及时排查。')
      return false
    }
  }

  getResetForm () {
    return {
      phone: this.phone,
      password: this.password
    }
  }

  httpLogin (captcha, successCallback, errorCallback) {

    let that = this

    if (!this.loginValidate()) {
      return
    }

    let form = this.getLoginForm()

    if (captcha) {
      form.captcha = captcha
    }

    this.httpPost(User.URL_LOGIN, form, function (response) {

      that.innerLogin(response)

      successCallback && successCallback(response)
    }, errorCallback)
  }

  httpResetPassword (captcha, successCallback, errorCallback) {
    let that = this

    if (!this.resetValidate()) {
      return
    }

    let form = this.getResetForm()

    if (captcha) {
      form.captcha = captcha
    }

    this.httpPost(User.URL_MEMBER_RESET_PASSWORD, form, function (response) {

      successCallback && successCallback(response)
    }, errorCallback)

  }

  httpLogout (successCallback, errorCallback) {

    let that = this

    that.innerLogout()

    this.httpPost(User.URL_LOGOUT, {}, function (response) {

      successCallback && successCallback(response)
    }, errorCallback)
  }

}
//注册Gender这个枚举变量
User.registerEnum('Gender', GenderMap)


