<template>
  <div id="editor-md" class="main-editor">
    <textarea></textarea>
  </div>
</template>

<script>
  import $script from 'scriptjs'
  //引入自定义的“上传附件”插件
  import EMAttachment from './EMAttachment.js'
  //引入自定义的“插入图片”插件
  import EMPicture from './EMPicture.js'

  export default {
    data() {
      return {
        instance: null,
        emAttachment: new EMAttachment(),
        emPicture: new EMPicture(),
        innerValue: null
      }
    },
    props: {
      editorPath: {
        type: String,
        default: '/bystatic/fork/editormd'
      },
      jqueryPath: {
        type: String,
        default: '/bystatic/fork/jquery'
      },
      value: {
        type: String,
        required: false
      }
    },
    watch: {
      'value'(newVal, oldVal) {
        let that = this

        if (that.innerValue === newVal) {
          //内部变化引起的


        } else {

          //外部变化引起的
          that.innerValue = newVal

          if (that.instance) {
            that.instance.setMarkdown(that.innerValue)
          }
        }

      }
    },
    created() {

    },
    methods: {
      initEditor() {
        let that = this
        let emAttachment = this.emAttachment
        let emPicture = this.emPicture
        let createElement = this.$createElement

        // Vue 异步执行 DOM 更新，template 里面的 script 标签异步创建
        // 所以，只能在 nextTick 里面初始化 editormd
        this.instance = window.editormd('editor-md', {
          width: '100%',
          height: 530,
          path: '/bystatic/fork/editormd/lib/', // Autoload modules mode, codemirror, marked... dependents libs path
          toolbarIcons: function () {
            // Or return editormd.toolbarModes[name]; // full, simple, mini
            // Using "||" set icons align right.
            return [
              'h1', 'h2', 'bold', 'del', 'italic', 'quote',
              'list-ul', 'list-ol', 'hr', '|',
              'link', 'reference-link', emPicture.name, emAttachment.name, 'code', 'table', '|', 'watch', 'preview', 'clear', 'fullscreen'
            ]
          },
          //自定义一个附件上传的动作
          toolbarIconsClass: {
            attachment: emAttachment.icon,  // 指定一个FontAawsome的图标类
            picture: emPicture.icon  // 指定一个FontAawsome的图标类
          },
          // 自定义工具栏按钮的事件处理
          toolbarHandlers: {
            /**
             * @param {Object}      cm         CodeMirror对象
             * @param {Object}      icon       图标按钮jQuery元素对象
             * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
             * @param {String}      selection  编辑器选中的文本
             */
            attachment: emAttachment.handler(createElement),
            picture: emPicture.handler(createElement)
          },
          //自定义菜单hover提示
          lang: {
            toolbar: {
              attachment: emAttachment.title,
              picture: emPicture.title
            }
          },

          markdown: that.innerValue,
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
          dialogMaskBgColor: '#000', // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
          onload: function () {

            if (that.innerValue) {
              that.instance.setMarkdown(that.innerValue)
            }

          },
          onchange: function () {

            that.innerValue = this.getMarkdown()

            // 编辑区域内容变化时，实时打印出当前内容
            that.$emit('input', that.innerValue)
            that.$emit('htmlChange', this.getHTML())

          }
        })

      }
    },
    mounted() {
      let that = this
      // async loading js dependencies
      // editormd depdend on jquery and zepto
      $script([
        `${that.jqueryPath}/dist/jquery.min.js`
      ], () => {
        $script(`${that.editorPath}/editormd.min.js`, () => {

          //设置延时，nextTick不靠谱啊。
          setTimeout(function () {
            that.initEditor()
          }, 600)

        })
      })

      //初始化各种插件

    },
    beforeDestroy() {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../../bystatic/fork/editormd/css/editormd.css";

  .main-editor {
    width: 100%;
    height: 100%;
  }

  .full-screen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

</style>
