<template>
  <div id="editor-md" class="main-editor">
    <textarea></textarea>
  </div>
</template>

<script>
  import $script from 'scriptjs';

  export default {
    props: {
      editorPath: {
        type: String,
        default: '/static/editormd'
      },
      jqueryPath: {
        type: String,
        default: '/static/jquery'
      },

      editorConfig: {
        type: Object,
        default() {
          return {
            width: '100%',
            height: 530,
            path: '/static/editormd/lib/', // Autoload modules mode, codemirror, marked... dependents libs path
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
            imageUpload: true,
            imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
            imageUploadURL: 'examples/php/upload.php',
            onload: () => {
              // eslint-disable-next-line
              console.log('onload', this);
            }
          };
        }
      }
    },
    data() {
      return {
        instance: null
      };
    },
    created() {

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
    },
    beforeDestroy() {
    },
    methods: {
      initEditor() {
        // eslint-disable-next-line
        this.$nextTick((editorMD = window.editormd) => {
          if (editorMD) {
            // Vue 异步执行 DOM 更新，template 里面的 script 标签异步创建
            // 所以，只能在 nextTick 里面初始化 editormd
            this.instance = editorMD('editor-md', this.editorConfig);
          }
        });
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../static/editormd/css/editormd.css";


  .main-editor {
    width: 100%;
    height: 100%;
  }

</style>
