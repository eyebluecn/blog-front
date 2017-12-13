import {MessageBox, Message} from 'element-ui';
import EMPicturePanel from "./EMPicturePanel";
import Tank from "../../model/tank/Tank"

export default class EMPicture {
  constructor() {
    this.name = "picture";
    this.title = "插入图片";
    this.icon = "fa-image";
  }

  handler(createElement) {

    return function (cm, icon, cursor, selection) {
      let tank = null
      let dom = createElement(EMPicturePanel, {
        props: {
          successCallback: function (t) {
            tank = t
          }
        }
      });
      MessageBox({
        title: "插入图片",
        message: dom,
        showCancelButton: true,
        confirmButtonText: '插入',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {

            if (tank && tank.exist()) {
              // 替换选中文本，如果没有选中文本，则直接插入
              cm.replaceSelection("![](" + tank.url + " \"" + tank.name + "\")");

              //清空文件
              tank.clear()

            } else {
              Message({
                type: 'warning',
                message: '请等待图片上传完毕'
              });
            }

            instance.confirmButtonLoading = false;
            done();
          } else {
            done();
          }
        }
      }).then(action => {
        console.log("取消了。");
      });

    }
  }
}
