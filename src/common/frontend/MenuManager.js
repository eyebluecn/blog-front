import Menu from './Menu'

export default class MenuManager {

}

//根据一个用户来获取他后台菜单。
MenuManager.refreshByMenus = function (user) {

  let byMenus = []

  if (user.role === "GUEST") {

    //登录
    let loginMenu = new Menu('登录', '/by/user/login', false, 'fa fa-user-circle-o')
    byMenus.push(loginMenu)

  } else {

    //首页
    let indexMenu = new Menu('首页', '/by', false, 'fa fa-home')
    byMenus.push(indexMenu)


    //首页
    let logoutMenu = new Menu('退出登录', '/by/user/login', false, 'fa fa-home')
    byMenus.push(logoutMenu)

  }


  return byMenus
}

