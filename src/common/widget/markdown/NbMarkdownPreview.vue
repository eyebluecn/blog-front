<template>
	<div id="editor-md-preview" class="editor-md-preview">
		<div v-html="html"></div>
	</div>
</template>

<script>
  import $script from 'scriptjs'

  export default {
    data () {
      return {
        instance: null
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
      },
      html: {
        type: String,
        required: false
      }
    },
    watch: {},
    created () {

    },
    methods: {
      initEditor () {
        let that = this

        // console.log(this.html);
        that.instance = window.editormd.markdownToHTML(
          'editor-md-preview', {
            htmlDecode: 'style,script,iframe',  // you can filter tags decode
            emoji: true,
            taskList: true,
            tex: true,  // 默认不解析
            flowChart: true,  // 默认不解析
            sequenceDiagram: true  // 默认不解析
          })

      }
    },
    mounted () {
      let that = this
      // async loading js dependencies
      // editormd depdend on jquery and zepto
      $script(`${that.jqueryPath}/dist/jquery.min.js`, () => {
        $script(`${that.editorPath}/lib/marked.min.js`, () => {
          $script(`${that.editorPath}/lib/prettify.min.js`, () => {
            $script(`${that.editorPath}/lib/raphael.min.js`, () => {
              $script(`${that.editorPath}/lib/underscore.min.js`, () => {
                $script(`${that.editorPath}/lib/sequence-diagram.min.js`, () => {
                  $script(`${that.editorPath}/lib/flowchart.min.js`, () => {
                    $script(`${that.editorPath}/lib/jquery.flowchart.min.js`, () => {
                      $script(`${that.editorPath}/editormd.js`, () => {

                        //设置延时，nextTick不靠谱啊。
                        setTimeout(function () {
                          that.initEditor()
                          that.$emit('markdownComplete')
                        }, 100)

                      })
                    })
                  })
                })
              })
            })
          })
        })
      })

      //初始化各种插件

    },
    beforeDestroy () {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
	@import "../../../../static/fork/editormd/css/editormd.css";

</style>
