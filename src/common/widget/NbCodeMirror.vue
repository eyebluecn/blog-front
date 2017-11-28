<template>
	<div>
		<div ref="editor">
		</div>
	</div>

</template>

<script>

	import CodeMirror from "codemirror";
	import 'codemirror/mode/htmlmixed/htmlmixed';
	import 'codemirror/lib/codemirror.css'

	export default {
		data() {
			return {
				codeMirror: null,
				//用来表名是自身主动的内容还是外部传进来的内容。
				content: null
			}
		},
		props: {
			readOnly: {
				type: Boolean,
				required: false,
				'default': false
			},
			value: {
				type: String,
				required: false
			}
		},
		computed: {},
		methods: {
			insert(text){

				this.codeMirror.replaceSelection(text);

			}
		},
		watch: {
			"value"(newVal, oldVal){

				//二者不等表名是外部变化的。相等表名是自己变化的。
				if (this.content !== newVal) {
					this.content = this.value;
					this.codeMirror.setValue(this.content === null ? "" : this.content);

				}

			}
		},
		mounted() {
			let that = this;

			this.codeMirror = CodeMirror(this.$refs.editor, {
				readOnly: that.readOnly,
				lineNumbers: true,
				mode: "htmlmixed"
			});

			this.content = this.value;
			this.codeMirror.setValue(this.content === null ? "" : this.content);

			this.codeMirror.on("change", function (editor, changes) {
				that.content = editor.getValue();
				// 编辑区域内容变化时，实时打印出当前内容
				that.$emit('input', that.content);
			});

		},
		beforeDestroy() {

		}
	}


</script>

<style lang="less">

</style>