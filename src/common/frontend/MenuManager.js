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

    //文章列表
    let articleListMenu = new Menu('文章列表', '/by/article/list', false, 'fa fa-book')
    byMenus.push(articleListMenu)

    //标签列表
    let tagListMenu = new Menu('标签列表', '/by/tag/list', false, 'fa fa-tags')
    byMenus.push(tagListMenu)

    //自家轮子
    let wheelMenu = new Menu('自家轮子', '/by/wheel', false, 'fa fa-ge')
    byMenus.push(wheelMenu)


    //退出登录
    let logoutMenu = new Menu('退出登录', '/by/user/login', false, 'fa fa-power-off')
    byMenus.push(logoutMenu)

  }


  return byMenus
}

