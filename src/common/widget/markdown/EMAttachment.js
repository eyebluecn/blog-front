import {MessageBox, Message} from 'element-ui';
import EMAttachmentPanel from "./EMAttachmentPanel";
import Tank from "../../model/tank/Tank"

export default class EMAttachment {
  constructor() {
    this.name = "attachment";
    this.title = "上传附件";
    this.icon = "fa-file-zip-o";
  }

  handler(createElement) {

    return function (cm, icon, cursor, selection) {
      let tank = null
      let dom = createElement(EMAttachmentPanel, {
        props: {
          successCallback: function (t) {
            tank = t
          }
        }
      });
      MessageBox({
        title: "上传附件",
        message: dom,
        showCancelButton: true,
        confirmButtonText: '插入',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {

            if (tank && tank.exist()) {
              // 替换选中文本，如果没有选中文本，则直接插入
              cm.replaceSelection("![](" + tank.fileIcon(true) + ")[" + tank.name + "](" + tank.url + ")");

              //清空文件
              tank.clear()

            } else {
              Message({
                type: 'warning',
                message: '请等待文件上传完毕'
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
