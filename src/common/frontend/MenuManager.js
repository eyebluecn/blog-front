import Menu from './Menu'
import Vue from 'vue'

export default class MenuManager {

}

//根据一个用户来获取他后台菜单。
MenuManager.refreshByMenus = function (user) {

  let byMenus = []

  //首页
  let indexMenu = new Menu('首页', '/by', false, 'fa fa-home')
  byMenus.push(indexMenu)

  return byMenus
}

