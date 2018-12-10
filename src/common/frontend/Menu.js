export default class Menu {
  constructor(name, path, icon = null, children = []) {

    this.name = name;
    this.icon = icon;
    this.path = path;
    this.children = children;
    this.show = true;
  }

  add = function (menu) {
    this.children.push(menu);
  }
}



