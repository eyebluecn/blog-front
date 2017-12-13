<template>
  <div id="editor-md" class="main-editor">
    <textarea></textarea>
  </div>
</template>

<script>
  import $script from 'scriptjs';

  //引入自定义的“上传附件”插件
  import EMAttachment from "./EMAttachment.js"

  export default {
    data() {
      return {
        instance: null,
        emAttachment: new EMAttachment()
      }
    },
    props: {
      editorPath: {
        type: String,
        default: '/static/fork/editormd'
      },
      jqueryPath: {
        type: String,
        default: '/static/fork/jquery'
      }
    },
    created() {

    },
    methods: {
      initEditor() {
        let emAttachment = this.emAttachment
        let createElement = this.$createElement

        // eslint-disable-next-line
        this.$nextTick((editorMD = window.editormd) => {
          if (editorMD) {
            // Vue 异步执行 DOM 更新，template 里面的 script 标签异步创建
            // 所以，只能在 nextTick 里面初始化 editormd
            this.instance = editorMD('editor-md', {
              width: '100%',
              height: 530,
              path: '/static/fork/editormd/lib/', // Autoload modules mode, codemirror, marked... dependents libs path
              toolbarIcons: function () {
                // Or return editormd.toolbarModes[name]; // full, simple, mini
                // Using "||" set icons align right.
                return [
                  "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
                  "h1", "h2", "h3", "h4", "h5", "h6", "|",
                  "list-ul", "list-ol", "hr", "|",
                  "link", "reference-link", "image", emAttachment.name, "code", "preformatted-text", "code-block", "table", "datetime", "pagebreak", "|", "watch", "preview", "clear", "|", "undo", "redo"
                ]
              },
              //自定义一个附件上传的动作
              toolbarIconsClass: {
                attachment: emAttachment.icon  // 指定一个FontAawsome的图标类
              },
              // 自定义工具栏按钮的事件处理
              toolbarHandlers: {
                /**
                 * @param {Object}      cm         CodeMirror对象
                 * @param {Object}      icon       图标按钮jQuery元素对象
                 * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
                 * @param {String}      selection  编辑器选中的文本
                 */
                attachment: emAttachment.handler(createElement)
              },
              //自定义菜单hover提示
              lang: {
                toolbar: {
                  attachment: emAttachment.title
                }
              },
              codeFold: true,
              saveHTMLToTextarea: true,
              searchReplace: true,
              htmlDecode: 'style,script,iframe|on*',
              emoji: false,
              taskList: true,
              tocm: true,                  // Using [TOCM]
              tex: true,                   // 开启科学公式TeX语言支持，默认关闭
              flowChart: true,             // 开启流程图支持，默认关闭
              sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
              dialogLockScreen: true,   // 设置弹出层对话框不锁屏，全局通用，默认为true
              dialogShowMask: true,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
              dialogDraggable: false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
              dialogMaskOpacity: 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
              dialogMaskBgColor: "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
              imageUpload: true,
              imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
              imageUploadURL: 'examples/php/upload.php',
              onload: () => {
                // eslint-disable-next-line
              }
            });
          }
        });
      }
    },
    mounted() {
      // async loading js dependencies
      // editormd depdend on jquery and zepto
      $script([
        `${this.jqueryPath}/dist/jquery.min.js`
      ], () => {
        $script(`${this.editorPath}/editormd.min.js`, () => {
          this.initEditor();
        });
      });

      //初始化各种插件

    },
    beforeDestroy() {
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../../static/fork/editormd/css/editormd.css";

  .main-editor {
    width: 100%;
    height: 100%;
  }

</style>
