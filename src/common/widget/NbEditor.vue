<template>
  <div>
    <div ref="editor" :style="style">
    </div>
  </div>

</template>

<script>

  import WangEditor from "../fork/wangeditor/WangEditor";
  import $ from "jquery";
  import PluginAlignCenter from "../fork/wangeditor/PluginAlignCenter";
  import PluginAlignJustify from "../fork/wangeditor/PluginAlignJustify";
  import PluginAlignLeft from "../fork/wangeditor/PluginAlignLeft";
  import PluginAlignRight from "../fork/wangeditor/PluginAlignRight";
  import PluginIndent from "../fork/wangeditor/PluginIndent";
  import PluginHr from "../fork/wangeditor/PluginHr";
  import PluginImage from "../fork/wangeditor/PluginImage";
  import PluginVideo from "../fork/wangeditor/PluginVideo";
  import PluginAttachment from "../fork/wangeditor/PluginAttachment";

  //对齐
  PluginAlignCenter(WangEditor, $);
  PluginAlignJustify(WangEditor, $);
  PluginAlignLeft(WangEditor, $);
  PluginAlignRight(WangEditor, $);

  //分割线插件
  PluginHr(WangEditor, $);
  //缩进插件
  PluginIndent(WangEditor, $);
  //图片上传插件
  PluginImage(WangEditor, $);
  //插入视频插件
  PluginVideo(WangEditor, $);
  //附件上传插件
  PluginAttachment(WangEditor, $);

  export default {
    data() {
      return {
        content: null,
        editor: null
      }
    },
    props: {
      value: {
        type: String,
        required: false
      },
      height: {
        type: String,
        required: false,
        "default"() {
          return "300px";
        }
      }
    },
    computed: {
      style() {
        return "height:" + this.height;
      }
    },
    methods: {
      insert(text) {

        this.editor.command(null, 'insertHtml', text);
      }
    },
    watch: {
      "value"(newVal, oldVal) {

        //只有第一次主动赋值
        if (this.content === null) {
          this.content = this.value;

          this.editor.$txt.html(this.value);
        }

      }
    },
    mounted() {
      let that = this;
      this.editor = new WangEditor(this.$refs.editor);

      // 普通的自定义菜单
      this.editor.config.menus = [
        'source',
        'bold',
        'underline',
        'italic',
        'strikethrough',
        'hr',
        'eraser',
        'forecolor',
        'bgcolor',
        'quote',
        'fontfamily',
        'fontsize',
        'head',
        'indent',
        'unorderlist',
        'orderlist',
        'nbalignleft',
        'nbaligncenter',
        'nbalignright',
        'nbalignjustify',
        'link',
        'unlink',
        'table',
        'image',
        'video',
        'insertcode',
        'undo',
        'redo'
      ];

      //先禁用全屏模式。'fullscreen'

      // 配置 onchange 事件
      this.editor.onchange = function () {

        that.content = that.editor.$txt.html();
        // 编辑区域内容变化时，实时打印出当前内容
        that.$emit('input', that.content);
      };

      // 关闭菜单栏fixed
      this.editor.config.menuFixed = false;

      this.editor.create();

      //二次开发全屏功能
      this.editor.fullScreenClick = function () {
        $("body").addClass("editor-fullscreen");
      }
      this.editor.fullScreenClickSelected = function () {
        $("body").removeClass("editor-fullscreen");
      }


      //如果此时value和content的值不相等，让content的值变成value,.
      if (this.content === null) {
        this.content = this.value;
        this.editor.$txt.html(this.value);
      }
    },
    beforeDestroy() {
      if (this.editor) {
        this.editor.destroy();
      }

    }
  }


</script>

<style lang="less">
  @import "../fork/wangeditor/css/wangEditor";

  .wangEditor-txt img {
    max-width: 100%;
  }

  .editor-fullscreen {
    overflow: hidden;
  }

  .editor-fullscreen .navbar-static-side {
    display: none;
  }

</style>
