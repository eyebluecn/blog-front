import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import $ from 'jquery'
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from '../../util/Utils'
import Tank from '../tank/Tank'
import {FeatureType} from '../core/FeatureType'
import {Notification} from 'element-ui'
import {UserLegalRoleList, UserRole} from "./UserRole";
import {UserGender} from "./UserGender";
import {FilterType} from "../base/FilterType";


export default class User extends BaseEntity {


  static URL_LOGIN = '/api/user/login'
  static URL_LOGOUT = '/api/user/logout'
  static URL_USER_CHANGE_PASSWORD = '/api/user/change/password'
  static URL_USER_RESET_PASSWORD = '/api/user/reset/password'
  static URL_USER_EMAIL_SEND = '/api/user/email/send'


  constructor(args) {
    super(args)

    this.username = null
    this.nickname = null
    this.password = null
    this.role = UserRole.GUEST
    this.email = null
    this.phone = null
    //用户角色
    this.gender = UserGender.UNKNOWN
    this.city = null
    this.description = null
    this.avatarTankUuid = null
    this.avatarUrl = null
    //上次登录IP
    this.lastIp = null
    //上次登录时间
    this.lastTime = null

    //邮箱是否已经验证
    this.emailValidate = false

    this.avatar = new Tank('image', false, 1024 * 1024, '图片不能超过1M')

    //总共的文章数量
    this.articleNum = 0

    //总共收到的点赞数
    this.articleAgreeNum = 0

    //总共文章字数
    this.articleWords = 0

    //总阅读量
    this.articleHit = 0

    //总共收到的评论
    this.commentNum = 0

    //登录的密码，服务器返回字段中没有密码
    this.localPassword = null
    this.createTime = null

    //编辑用户资料时的验证规则。也是默认的验证规则。
    this.validatorSchema = {
      username: {
        rules: [{required: true, message: '用户名必填'}],
        error: null
      },
      nickname: {
        rules: [{required: true, message: '昵称必填'}],
        error: null
      },

      password: {
        rules: [{required: true, message: '密码必填'}],
        error: null
      },
      role: {
        rules: [{required: true, message: '用户角色必填'}],
        error: null
      },
      email: {
        rules: [{required: true, message: '邮箱必填'}, {
          type: 'string',
          pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
          message: '邮箱格式不正确'
        }],
        error: null
      },
      gender: {
        rules: [{required: true, message: '性别必填'}],
        error: null
      }

    }

  }


  getFilters() {
    return [
      ...super.getFilters(),
      new Filter(FilterType.SORT, '最近', 'orderLastTime'),
      new Filter(FilterType.INPUT, '姓名', 'username'),
      new Filter(FilterType.INPUT, '邮箱', 'email'),
      new Filter(FilterType.INPUT, '电话', 'phone'),
      new Filter(FilterType.SELECTION, '角色', 'role', UserLegalRoleList),
      new Filter(FilterType.INPUT, '关键字', 'keyword')
    ]
  };

  //We use this method to get the full js Object.
  render(obj) {
    super.render(obj)
    this.renderEntity('lastTime', Date)
    this.renderEntity('avatar', Tank)
  }


  //获取用户头像的url.
  getAvatarUrl() {
    if (this.avatarUrl) {
      return this.avatarUrl
    } else {
      return require('../../../assets/img/avatar.png')
    }
  }


  //将用户信息存储在本地。
  renderFromLocalStorage() {

    try {
      let userString = readLocalStorage(this.getTAG())

      if (userString) {
        let json = JSON.parse(userString)
        this.render(json)

      }

    } catch (e) {
      removeLocalStorage(this.getTAG())
    }
  }

  //将用户信息存储在本地。
  saveToLocalStorage(rawUserObject = null) {

    saveToLocalStorage(this.getTAG(), JSON.stringify(rawUserObject))
  }

  //清除本地的user信息
  clearLocalStorage() {

    removeLocalStorage(this.getTAG())
  }

  //更新本地持久化了的个别字段。
  updateLocalStorage(opt = {}) {
    try {
      let userString = readLocalStorage(this.getTAG())

      if (userString) {
        let json = JSON.parse(userString)
        $.extend(json, opt)

        saveToLocalStorage(this.getTAG(), JSON.stringify(json))
      }

    } catch (e) {
      removeLocalStorage(this.getTAG())
    }
  }

  getForm() {

    return {
      username: this.username,
      nickname: this.nickname,
      password: this.password,
      role: this.role,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      city: this.city,
      description: this.description,
      avatarTankUuid: this.avatar.uuid,
      avatarUrl: this.avatar.uuid ? this.avatar.url : null,
      uuid: this.uuid ? this.uuid : null
    }
  }

  validate() {

    if (this.editMode) {
      this.password = true
    }

    return super.validate()
  }

  httpSave(successCallback, errorCallback) {
    let that = this
    let url = this.getUrlCreate()
    if (this.uuid) {
      url = this.getUrlEdit()
    }

    if (!this.validate()) {
      that.defaultErrorHandler(this.errorMessage, errorCallback)
      return
    }

    let form = this.getForm()

    this.httpPost(url, form, function (response) {

      that.render(response.data.data)

      successCallback && successCallback(response)

    }, errorCallback)
  }

  //local logout.
  innerLogout() {

    this.render(new User())


    this.clearLocalStorage()

  }

  innerLogin(response) {
    let that = this
    that.errorMessage = null
    that.render(response.data.data)

    //登录成功后去本地保存一下用户的简单信息，方便下次自动填入个别字段。
    this.saveToLocalStorage(response.data.data)

  }

  resetValidate() {

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

  hasPermission(featureType) {
    if (this.role === UserRole.ADMIN) {
      return true
    } else if (this.role === UserRole.USER) {
      return featureType === FeatureType.PUBLIC || featureType === FeatureType.USER_MINE
    } else {
      return featureType === FeatureType.PUBLIC
    }

  }

  getResetForm() {
    return {
      phone: this.phone,
      password: this.password
    }
  }

  httpLogin(captcha, successCallback, errorCallback) {

    let that = this

    //验证参数。
    if (!this.email) {
      this.errorMessage = '邮箱必填'
      return
    }
    if (!this.localPassword) {
      this.errorMessage = '密码必填'
      return
    }
    this.errorMessage = null

    let form = {
      email: this.email,
      password: this.localPassword
    }

    if (captcha) {
      form.captcha = captcha
    }

    this.httpPost(User.URL_LOGIN, form, function (response) {

      that.innerLogin(response)

      successCallback && successCallback(response)
    }, function (response) {

      that.errorMessage = that.getErrorMessage(response)
      errorCallback && errorCallback(response)
    })
  }

  httpResetPassword(captcha, successCallback, errorCallback) {
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

  httpLogout(successCallback, errorCallback) {

    let that = this

    that.innerLogout()

    this.httpPost(User.URL_LOGOUT, {}, function (response) {

      successCallback && successCallback(response)
    }, errorCallback)
  }

  httpUserChangePassword(oldPassword, newPassword, successCallback, errorCallback) {
    let that = this
    this.httpPost(User.URL_USER_CHANGE_PASSWORD, {
      'oldPassword': oldPassword,
      'newPassword': newPassword
    }, function (response) {
      typeof successCallback === 'function' && successCallback(response)
    }, errorCallback)
  }

  httpUserResetPassword(newPassword, successCallback, errorCallback) {
    let that = this
    this.httpPost(User.URL_USER_RESET_PASSWORD, {
      'userUuid': this.uuid,
      'newPassword': newPassword
    }, function (response) {
      typeof successCallback === 'function' && successCallback(response)
    }, errorCallback)
  }

  httpConfirmEmail(successCallback, errorCallback) {
    let that = this
    this.httpPost(User.URL_USER_EMAIL_SEND, {}, function (response) {
      Notification.success({
        message: '验证短信发送成功，请登录邮箱查看'
      })
      typeof successCallback === 'function' && successCallback(response)
    }, errorCallback)
  }

}



