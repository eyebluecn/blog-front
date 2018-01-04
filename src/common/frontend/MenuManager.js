import Menu from './Menu'
import { FeatureType } from '../model/feature/FeatureType'

export default class MenuManager {

}

//根据一个用户来获取他后台菜单。
MenuManager.refreshByMenus = function (user) {

  let byMenus = []

  if (user.role === 'GUEST') {

    //登录
    let loginMenu = new Menu('登录', '/by/user/login', false, 'fa fa-user-circle-o')
    byMenus.push(loginMenu)

  } else {

   /* //首页
    let indexMenu = new Menu('首页', '/by', false, 'fa fa-home')
    byMenus.push(indexMenu)*/

    //文章列表
    let articleListMenu = new Menu('文章列表', '/by', false, 'fa fa-book')
    byMenus.push(articleListMenu)

    //标签列表
    let tagListMenu = new Menu('标签列表', '/by/tag/list', false, 'fa fa-tags')
    byMenus.push(tagListMenu)

    //网站设置
    let preferenceMenu = new Menu('网站偏好', '/by/preference', false, 'fa fa-dashboard')
    byMenus.push(preferenceMenu)

    if (user.hasPermission(FeatureType.USER_MANAGE)) {
      //用户列表
      let userMenu = new Menu('用户列表', '/by/user/list', false, 'fa fa-user')
      byMenus.push(userMenu)
    }

    let reportMenu = new Menu('举报列表', '/by/report/list', false, 'fa fa-warning')
    byMenus.push(reportMenu)

    //退出登录
    let logoutMenu = new Menu('退出登录', '/by/user/login', false, 'fa fa-power-off')
    byMenus.push(logoutMenu)

  }

  return byMenus
}

