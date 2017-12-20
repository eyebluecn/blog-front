<template>
	<div class="nb-markdown-preview" id="nb-markdown-preview" v-html="html"></div>
</template>

<script>
	import '../../../../static/fork/editormd/lib/flowchart.min'
	import '../../../../static/fork/editormd/lib/jquery.flowchart.min'
	import '../../../../static/fork/editormd/lib/marked.min'
	import '../../../../static/fork/editormd/lib/prettify.min'
	import '../../../../static/fork/editormd/lib/raphael.min'
  import '../../../../static/fork/editormd/lib/sequence-diagram.min'
	import '../../../../static/fork/editormd/lib/underscore.min'
	import $ from 'jquery'
  export default {
    name: 'nb-markdown-preview',
	  data(){
      return{

      }
	  },
	  props:{
      html:{
        type: String,
	      required: true
      }
	  },
	  methods:{

	  },
	  mounted(){
      let editorMdView = editormd.markdownToHTML('nb-markdown-preview',{
        htmlDecode: "style,script,iframe",
        emoji: true,
        taskList: true,
        tex: true,  // 默认不解析
        flowChart: true,  // 默认不解析
        sequenceDiagram: true  // 默认不解析
      })
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">
	@import '../../../../static/fork/editormd/css/editormd.preview.min.css';
	.nb-markdown-preview{

	}
</style>